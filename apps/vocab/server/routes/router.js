import express from "express";
import {v4} from "uuid";
import {getCategories, saveCategories, getEntries, saveEntries} from "../db/db.js";

const router = express.Router()
router.get('/', function (req, res) {
    res.render('index', {title: '干净 Vocab', appName: 'vocab'})
})

router.get('/category', function (req, res) {
    res.json(getCategories())
})

router.post('/category', function (req, res) {
    const categories = getCategories()

    const newId = v4()

    categories[newId] = {
        id: newId,
        name: req.body.name,
    }

    saveCategories(categories)

    res.json({message: 'Saved!'})
})

router.delete('/category', function (req, res) {
    const categories = getCategories()

    categories[req.body.categoryId] = undefined

    saveCategories(categories)

    res.json({message: 'Deleted!'})
})

router.get('/entry', function (req, res) {
    res.json(getEntries())
})

router.post('/entry', function (req, res) {
    const entries = getEntries()

    if (!entries[req.body.categoryId]) {
        entries[req.body.categoryId] = []
    }

    entries[req.body.categoryId].push({
        id: v4(),
        categoryId: req.body.categoryId,
        hanzi: req.body.hanzi,
        pinyin: req.body.pinyin,
        english: req.body.english,
    })

    saveEntries(entries)

    res.json({message: 'Saved!'})
})

router.delete('/entry', function (req, res) {
    const entries = getEntries()

    const categoryToDeleteFrom = req.body.categoryId
    const entryIdToDelete = req.body.entryId

    const entryToDeleteIndex = entries[categoryToDeleteFrom].findIndex(entry => entry.id === entryIdToDelete)
    const deleted = entries[categoryToDeleteFrom].splice(entryToDeleteIndex, 1)

    saveEntries(entries)

    res.json({message: 'Deleted!', deleted})
})



export default router
