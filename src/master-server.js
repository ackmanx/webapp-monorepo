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


// ---------------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------------
//todo: left off here. I need middleware and a switch now or something
//todo: I have to be able to use root url for each subdomain
app.use('/', require('../apps/dict/server/routes/render')) //todo: setup required
app.use('/', require('../apps/pinyin/server/routes/render')) //todo: setup required


// ---------------------------------------------------------------------------------
// Error handling
// ---------------------------------------------------------------------------------

//If we made it this far, none of our routes were triggered, so it is a 404
app.use(function (req, res, next) {
    next(createError(404))
})

module.exports = app
