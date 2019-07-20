const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const db = low(new FileSync('server/db/database.json'))

//This only runs if there's no db, I think?
db.defaults({}).write()
