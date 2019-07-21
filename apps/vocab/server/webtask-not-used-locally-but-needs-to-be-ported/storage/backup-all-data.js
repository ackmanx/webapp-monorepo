//This isn't a webtask. Just run it with node.

const fetch = require('node-fetch')
const fs = require('fs')

async function backup() {
    const categoriesResult = await fetch('https://wt-b799f0ade639c484ac317ecb184a02ad-0.sandbox.auth0-extend.com/sheng-ci-category')
    const categories = await categoriesResult.json()
    fs.writeFileSync('backed-up-categories.json', JSON.stringify(categories, null, 4))

    const entriesResult = await fetch('https://wt-b799f0ade639c484ac317ecb184a02ad-0.sandbox.auth0-extend.com/sheng-ci-entry')
    const entries = await entriesResult.json()
    fs.writeFileSync('backed-up-entries.json', JSON.stringify(entries, null, 4))
}

backup()
