const express = require('express')
const router = express.Router()

router.get('/', function (req, res) {
    res.render('index', {title: 'Type Pinyin', appName: 'pinyin'})
})

module.exports = router
