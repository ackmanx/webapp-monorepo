const express = require('express')

const router = express.Router()

router.get('/', function (req, res) {
    res.render('index', {title: 'I Already Did That', appName: 'i-already-did-that', path: req.path})
})

module.exports = router
