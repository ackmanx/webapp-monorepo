const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const compression = require('compression')
const log = require('debug')('mr:app')
const fs = require('fs')
const path = require('path')

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
/*
 * The way this works is if a site is hosted with a custom domain, we want that site to act like its own
 * So, we change the URL for any request coming from that site to one that the app can handle
 * Request is only rewritten from the server's perspective
 *
 * Example:
 *   A user goes to www.ialreadydidthat.com/something
 *   The url is prefixed with "/i-already-did-that" so that the router for this application processes it
 */
app.use(function (req, res, next) {
    log('hostname:', req.hostname)

    if (req.hostname === 'www.ialreadydidthat.com') {
        req.url = `/pinyin${req.path}`
    }

    next()
})

const appInfos = []

fs.readdirSync(path.join(__dirname, '..', 'apps')).forEach(appName => {
    if (!fs.lstatSync(path.resolve('apps', appName)).isDirectory()) return

    const packageJson = require(path.resolve('apps', appName, `package.json`))

    log(`Registering Express routes for ${packageJson.name}`)

    appInfos.push({url: `/${packageJson.name}`, name: packageJson.name.split('-').join(' ')})

    app.use(`/${packageJson.name}`, require(`../apps/${packageJson.name}/server/routes/router`))
})

app.get('/', function (req, res) {
    res.render('app-selector', {title: `It's so mono, this webapp`, appInfos})
})

// ---------------------------------------------------------------------------------
// Error handling
// ---------------------------------------------------------------------------------

//If we made it this far, none of our routes were triggered, so it is a 404
app.use(function (req, res) {
    res.json({error: 404, path: req.path})
})

module.exports = app
