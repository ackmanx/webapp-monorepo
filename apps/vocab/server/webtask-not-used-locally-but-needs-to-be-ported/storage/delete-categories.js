//This isn't a webtask. Just run it with node.

const fetch = require('node-fetch')

const whitelist = [
    '3b028f76-dba0-4931-a740-e8bdd5c5357f',
    'be8d29c1-3ff9-47a2-9f25-79e00b4cd7d8',
    '86f4490e-e7f8-4f5a-8fec-887475e16f44',
]

async function deleteCategories() {
    const result = await fetch('https://wt-b799f0ade639c484ac317ecb184a02ad-0.sandbox.auth0-extend.com/sheng-ci-category')
    const categories = await result.json()

    console.log('Found categories:', categories);

    Object.keys(categories).forEach(async key => {
        if (!whitelist.includes(key)) {
            console.log('Attempting to delete:', key);
            setTimeout(
                async () => {
                    const result = await fetch('https://wt-b799f0ade639c484ac317ecb184a02ad-0.sandbox.auth0-extend.com/sheng-ci-category', {
                        method: 'DELETE',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({categoryId: key}),
                    })
                },
                //Webtask will block requests if too many happen too quickly
                Math.floor(Math.random() * 1000)
            )
        }
    })
}

deleteCategories()
