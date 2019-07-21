const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const compression = require('compression')

const app = express()

// ---------------------------------------------------------------------------------
// Engine setup
// ---------------------------------------------------------------------------------
app.set('views', `${__dirname}/../src/views`)
app.set('view engine', 'ejs')


// ---------------------------------------------------------------------------------
// Middleware
// ---------------------------------------------------------------------------------
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(express.static(`${__dirname}/../public`))
app.use(compression())

app.use(function (req, res, next) {
    if (req.subdomains.length) {
        req.url = `/${req.subdomains[0]}`
    }

    next()
})


// ---------------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------------
app.use('/pinyin', require('../apps/pinyin/server/routes/router'))
app.use('/vocab', require('../apps/vocab/server/routes/router'))

app.get('/', function (req, res) {
    res.render('app-selector', {title: '干净', isProd: process.env.NODE_ENV === 'production'})
})


// ---------------------------------------------------------------------------------
// Error handling
// ---------------------------------------------------------------------------------

//If we made it this far, none of our routes were triggered, so it is a 404
app.use(function (req, res) {
    res.json({error: 404})
})

module.exports = app
