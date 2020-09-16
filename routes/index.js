const express = require('express')
const router = express.Router()
const home = require('./home')
const uploads = require('./uploads')

router.use('/', home)
router.use('/uploads', uploads)

module.exports = router
