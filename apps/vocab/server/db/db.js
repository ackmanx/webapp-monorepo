const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync.js')

const db = low(new FileSync(`${__dirname}/database.json`))

const SLICES = {
    categories: 'categories',
    entries: 'entries',
}

db.defaults({
    categories: {},
    entries: {},
}).write()

exports.getCategories = () => db.get(SLICES.categories).value()
exports.saveCategories = categories => db.set(SLICES.categories, categories).write()
exports.getEntries = () => db.get(SLICES.entries).value()
exports.saveEntries = entries => db.set(SLICES.entries, entries).write()
