const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

//Path relative to project root
const db = low(new FileSync('apps/vocab/server/db/database.json'))

const SLICES = {
    categories: 'categories',
    entries: 'entries',
}

db
    .defaults({
        categories: {},
        entries: {},
    })
    .write()

exports.getCategories = () => db.get(SLICES.categories).value()

exports.getEntries = () => db.get(SLICES.entries).value()
