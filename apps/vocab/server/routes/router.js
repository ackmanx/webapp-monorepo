const express = require('express')
const router = express.Router()

const db = require('../db/db')

router.get('/', function (req, res) {
    res.render('index', {title: '干净 Vocab', appName: 'vocab'})
})

router.get('/category', function (req, res) {
    res.json(db.getCategories())
})

router.get('/entry', function (req, res) {
    res.json(db.getEntries())
})

module.exports = router
