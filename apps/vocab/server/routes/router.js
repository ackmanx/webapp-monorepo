const express = require('express')
const router = express.Router()

router.get('/', function (req, res) {
    res.render('index', {title: '干净 Vocab', appName: 'vocab'})
})

module.exports = router
