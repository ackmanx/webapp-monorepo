/**
 * This file is hosted on Webtask
 * To update, run npm script webtask-deploy
 *
 * https://wt-b799f0ade639c484ac317ecb184a02ad-0.sandbox.auth0-extend.com/sheng-ci-category
 */
const express = require('express')
const Webtask = require('webtask-tools')
const bodyParser = require('body-parser')
const uuidv4 = require('uuid/v4')
const app = express()

app.use(bodyParser.json())

app.get('/', function (req, res) {
    req.webtaskContext.storage.get(function (error, categories = {}) {
        if (error) {
            return res.json({message: 'Error getting from storage', error})
        }

        res.json(categories)
    })
})

app.post('/', function (req, res) {
    req.webtaskContext.storage.get(function (error, categories = {}) {
        if (error) {
            return res.json({message: 'Error getting from storage before saving', error})
        }

        const newId = uuidv4()

        categories[newId] = {
            id: newId,
            name: req.body.name,
        }

        req.webtaskContext.storage.set(categories, function (error) {
            if (error) {
                return res.json({message: 'Error saving to storage', error})
            }

            res.json({message: 'Saved!', saved: categories[req.body.id]})
        })
    })
})

app.delete('/', function (req, res) {
    req.webtaskContext.storage.get(function (error, categories = {}) {
        if (error) {
            return res.json({message: 'Error getting from storage before deleting', error})
        }

        categories[req.body.categoryId] = undefined

        req.webtaskContext.storage.set(categories, function (error) {
            if (error) {
                return res.json({message: 'Error saving to storage after delete', error})
            }

            res.json({message: 'Deleted!', saved: categories[req.body.id]})
        })
    })
})

module.exports = Webtask.fromExpress(app)
