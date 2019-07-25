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

router.delete('/category', function (req, res) {
    const categories = db.getCategories()

    categories[req.body.categoryId] = undefined

    db.saveCategories(categories)

    res.json({message: 'Deleted!'})
})

router.get('/entry', function (req, res) {
    res.json(db.getEntries())
})


router.post('/entry', function (req, res) {
    const entries = db.getEntries()

    if (!entries[req.body.categoryId]) {
        entries[req.body.categoryId] = []
    }

    entries[req.body.categoryId].push({
        id: uuidv4(),
        categoryId: req.body.categoryId,
        hanzi: req.body.hanzi,
        pinyin: req.body.pinyin,
        english: req.body.english,
    })

    db.saveEntries(entries)

    res.json({message: 'Saved!'})
})


module.exports = router
