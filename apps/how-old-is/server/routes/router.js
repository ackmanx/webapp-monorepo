const express = require('express')

const router = express.Router()

router.get('/', function (req, res) {
    res.render('index', {title: 'How Old Is?', appName: 'how-old-is', path: req.path})
})

module.exports = router
