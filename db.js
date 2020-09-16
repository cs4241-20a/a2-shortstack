/* eslint-disable snakecasejs/snakecasejs */
const { Sequelize } = require('sequelize')
const bcrypt = require('bcrypt')
const fs = require('fs')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './data.db'
})
const salt_rounds = 10

const Upload = sequelize.define('upload', {
  uploader: { type: Sequelize.STRING, allowNull: false },
  file_name: { type: Sequelize.STRING, allowNull: false },
  key: { type: Sequelize.STRING, allowNull: true },
  upload_path: { type: Sequelize.STRING, allowNull: false },
  upload_name: { type: Sequelize.STRING, allowNull: false },
  mime_type: { type: Sequelize.STRING, allowNull: true },
  size: { type: Sequelize.INTEGER, allowNull: false },
  file_ext: {
    type: Sequelize.VIRTUAL,
    allowNull: true,
    get () {
      if (this.file_name.includes('.')) {
        return this.file_name.slice(this.file_name.lastIndexOf('.'))
      }
      return null
    }
  },
  download_path: {
    type: Sequelize.VIRTUAL,
    get () {
      return `/${this.upload_name}`
    }
  },
  size_formatted: {
    type: Sequelize.VIRTUAL,
    get () {
      if (this.size >= 1000000) {
        return `${(this.size / 1000000.0).toFixed(2)}MB`
      } else if (this.size >= 1000) {
        return `${(this.size / 1000.0).toFixed(2)}KB`
      }
      return `${this.size}B`
    }
  },
  quota_percentage: {
    type: Sequelize.VIRTUAL,
    get () {
      return `${((this.size / 200000000.0) * 100).toFixed(3)}%` // 200MB max theoretical storage
    }
  },
  created_at: { type: Sequelize.STRING, defaultValue: sequelize.literal('current_timestamp') }
}, { timestamps: false })

Upload.addHook('beforeCreate', (instance, options) => {
  instance.key = bcrypt.hashSync(instance.key, salt_rounds)
})
Upload.addHook('beforeDestroy', (instance, options) => {
  fs.unlinkSync(instance.upload_path)
  Upload.capacity -= instance.size
})
Upload.addHook('afterCreate', (instance, options) => {
  Upload.capacity += instance.size
})

Upload.check_key = async function (id, key) {
  const file = await Upload.findByPk(id).catch(err => {
    console.error(err)
    return false
  })
  if (file === false) {
    return file
  } else {
    return bcrypt.compareSync(key, file.key)
  }
}

Upload.prototype.check_key = function (key) {
  return bcrypt.compareSync(key, this.key)
}

Upload.get_capacity = function (key) {
  return Upload.findAll({
    attributes: [[sequelize.fn('sum', sequelize.col('size')), 'capacity']]
  }).then(result => {
    return result[0].dataValues
  }).catch(err => {
    console.error(`Failed to get capacity: ${err}`)
    return { capacity: 0 }
  })
}

Upload.capacity = 0
Upload.get_capacity().then(cap => {
  Upload.capacity = cap.capacity
})

if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads')
}

sequelize.sync()

module.exports = Upload
