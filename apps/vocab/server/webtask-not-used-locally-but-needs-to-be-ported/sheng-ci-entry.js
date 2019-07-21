/**
 * This file is hosted on Webtask
 * To update, run npm script webtask-deploy
 *
 * https://wt-b799f0ade639c484ac317ecb184a02ad-0.sandbox.auth0-extend.com/sheng-ci-entry
 */
const express = require('express')
const Webtask = require('webtask-tools')
const bodyParser = require('body-parser')
const uuidv4 = require('uuid/v4')
const app = express()

app.use(bodyParser.json())

app.get('/', function (req, res) {
    req.webtaskContext.storage.get(function (error, entries = {}) {
        if (error) {
            return res.json({message: 'Error getting from storage', error})
        }

        res.json(entries)
    })
})

/*
 * Contract:
 * {
 *   id: String
 *   categoryId: String
 *   hanzi: String
 *   pinyin: String
 *   english: String
 * }
 */
app.post('/', function (req, res) {
    req.webtaskContext.storage.get(function (error, entries = {}) {
        if (error) {
            return res.json({message: 'Error getting from storage before saving', error})
        }

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

        req.webtaskContext.storage.set(entries, function (error) {
            if (error) {
                return res.json({message: 'Error saving to storage', error})
            }

            res.json({message: 'Saved!', saved: entries[req.body.categoryId]})
        })
    })
})

app.delete('/', function (req, res) {
    req.webtaskContext.storage.get(function (error, entries = {}) {
        if (error) {
            return res.json({message: 'Error getting from storage before deleting', error})
        }

        const categoryToDeleteFrom = req.body.categoryId
        const entryIdToDelete = req.body.entryId

        const entryToDeleteIndex = entries[categoryToDeleteFrom].findIndex(entry => entry.id === entryIdToDelete)
        const deleted = entries[categoryToDeleteFrom].splice(entryToDeleteIndex, 1)

        req.webtaskContext.storage.set(entries, function (error) {
            if (error) {
                return res.json({message: 'Error saving to storage after delete', error})
            }

            res.json({message: 'Deleted!', deleted})
        })
    })
})

module.exports = Webtask.fromExpress(app)
