const path = require('path')
const express = require('express')
const body_parser = require('body-parser')

const routes = require('./routes')

const app = express()
const port = process.env.PORT || 3001
global.upload_path = path.join(__dirname, 'uploads')

// configure pug as view engine for html pages
app.set('view engine', 'pug')
app.set('views', './views')

app.use(body_parser.urlencoded({ extended: true }))
app.use(body_parser.json())
app.use(routes)
app.use(express.static('uploads'))
app.use(express.static('public'))
console.log(global.upload_path)
app.listen(port, () =>
  console.log(`server listening on port ${port}!`)
)
