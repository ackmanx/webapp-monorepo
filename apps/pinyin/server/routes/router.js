import express from "express";

const router = express.Router()

router.get('/', function (req, res) {
    res.render('index', {title: '干净 Type Pinyin', appName: 'pinyin'})
})

export default router
