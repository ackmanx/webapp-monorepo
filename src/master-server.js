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
app.set('views', [
    `${__dirname}/../apps/dictionary/server/views` //todo: setup required
])
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
app.use('/', require('../apps/dictionary/server/routes/render')) //todo: setup required


// ---------------------------------------------------------------------------------
// Error handling
// ---------------------------------------------------------------------------------

//If we made it this far, none of our routes were triggered, so it is a 404
app.use(function (req, res, next) {
    next(createError(404))
})

module.exports = app
