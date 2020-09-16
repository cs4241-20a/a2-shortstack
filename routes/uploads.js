/* eslint-disable no-proto */
/* eslint-disable snakecasejs/snakecasejs */
const fs = require('fs')
const express = require('express')
const multer = require('multer')
const { v4 } = require('uuid')
const Upload = require('../db')

const CODEBASE_SIZE = 0

const router = express.Router()
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, global.upload_path)
  },
  filename: function (req, file, cb) {
    cb(null, v4())
  }
})
const upload = multer({ storage: storage })

// File Submission Form
router.post('/', upload.single('file'), function (req, res) {
  console.log(req.file, req.body)
  const params = req.body
  params.file_name = req.file.originalname
  params.upload_path = req.file.path
  params.upload_name = req.file.filename
  params.mime_type = req.file.mimetype
  params.size = req.file.size
  Upload.create(params).then(instance => {
    res.redirect('/uploads')
  }).catch(err => {
    res.send('Error: ' + err)
    fs.unlinkSync(params.upload_path)
  })
})

// POST form to delete files
router.post('/delete/:id', async function (req, res) {
  const id = req.params.id
  const { key } = req.body
  let file

  try {
    file = await Upload.findByPk(id)
  } catch (err) {
    res.status(404).send(`Unable to retrive upload entry with Id ${id}`)
    return
  }

  // If user cancels operation
  if (key === null) {
    res.status(204).send()
    return
  }

  // Verify that the submitted key is correct.
  const valid = file.check_key(key)
  if (valid === true) {
    file.destroy().then(() => {
      res.status(201).send()
    }).catch(err => { res.status(500).send(`Unable to delete selected file. \n${err}`) })
  } else {
    res.status(403).send('Invalid password')
  }
})

router.get('/', function (req, res) {
  Upload.findAll({ order: [['id', 'DESC']] }).then(results => {
    const entries = []
    results.forEach(result => {
      const entry = {}
      result._options.attributes.forEach(attr => {
        entry[attr] = result[attr]
        if (attr === 'created_at') {
          entry[attr] = new Date(Date.parse(entry[attr] + ' UTC'))
        }
      })
      entries.push(entry)
    })
    res.render('uploads', { entries: entries, title: 'Uploads - Glitch Drive' })
  }).catch(err => {
    res.send('Error: ' + err)
  })
})

router.get('/capacity', async function (req, res) {
  res.json({ capacity: Upload.capacity + CODEBASE_SIZE })
})

module.exports = router
