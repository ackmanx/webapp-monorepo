import low from "lowdb";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import FileSync from "lowdb/adapters/FileSync.js";

const __dirname = dirname(fileURLToPath(import.meta.url));



const db = low(new FileSync(`${__dirname}/database.json`))

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

export const getCategories = () => db.get(SLICES.categories).value()
export const saveCategories = categories => db.set(SLICES.categories, categories).write()
export const getEntries = () => db.get(SLICES.entries).value()
export const saveEntries = entries => db.set(SLICES.entries, entries).write()
