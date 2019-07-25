const express = require('express')
const router = express.Router()
const uuidv4 = require('uuid')

const db = require('../db/db')

router.get('/', function (req, res) {
    res.render('index', {title: '干净 Vocab', appName: 'vocab'})
})

router.get('/category', function (req, res) {
    res.json(db.getCategories())
})

router.post('/category', function (req, res) {
    const categories = db.getCategories()

    const newId = uuidv4()

    categories[newId] = {
        id: newId,
        name: req.body.name,
    }

    db.saveCategories(categories)

    res.json({message: 'Saved!'})
})

router.get('/entry', function (req, res) {
    res.json(db.getEntries())
})

module.exports = router
