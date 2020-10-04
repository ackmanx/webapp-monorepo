const express = require('express')
const {formatTitle} = require('../../../../src/utils')
const appName = require('../../package.json').name

const router = express.Router()

router.get('/', function (req, res) {
    res.render('index', {
        title: formatTitle(appName),
        appName,
        path: req.path,
    })
})

router.get('/something', function (req, res) {
    res.json([
        {title: 'Shower', instances: ['1601768240', '1601358240']},
        {title: 'Mow Lawn', instances: ['1601768240', '1601358240']},
    ])
})

module.exports = router
