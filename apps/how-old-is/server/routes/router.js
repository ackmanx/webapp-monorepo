const express = require('express')
const {formatTitle} = require("../../../../src/utils");
const appName = require('../../package.json').name

const router = express.Router()

router.get('/', function (req, res) {
    res.render('index', {
        title: formatTitle(appName),
        appName,
        path: req.path
    })
})

module.exports = router
