import express from "express"
import cookieParser from "cookie-parser"
import logger from "morgan"
import compression from "compression"
import {dirname} from 'path';
import {fileURLToPath} from 'url';
import debug from "debug"

import pinyinRouter from '../apps/pinyin/server/routes/router.js'
import vocabRouter from '../apps/vocab/server/routes/router.js'

const log = debug('mr:app')
const __dirname = dirname(fileURLToPath(import.meta.url));
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
app.use(function (req, res, next) {
    log('hostname:', req.hostname)

    if (req.hostname === 'www.ialreadydidthat.com') {
        req.url = `/pinyin/${req.path}`
    }

    next()
})

app.use('/pinyin', pinyinRouter)
app.use('/vocab', vocabRouter)

app.get('/', function (req, res) {
    res.render('app-selector', {title: '干净', isProd: process.env.NODE_ENV === 'production'})
})


// ---------------------------------------------------------------------------------
// Error handling
// ---------------------------------------------------------------------------------
//If we made it this far, none of our routes were triggered, so it is a 404
app.use(function (req, res) {
    res.json({error: 404, path: req.path})
})

export default app
