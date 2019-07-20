const express = require('express')
const router = express.Router()

router.get('/', function (req, res) {
    res.render('index', {title: '干净 Ganjing', appName: 'dict'})
})

module.exports = router
