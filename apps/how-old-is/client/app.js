import React from 'react'
import './app.css'
import Group from './group'

export default class App extends React.Component {
    constructor() {
        super()

        this.state = {
            people: [],
        }

        const webtaskBaseUrl = 'https://wt-b799f0ade639c484ac317ecb184a02ad-0.sandbox.auth0-extend.com'

        fetch(`${webtaskBaseUrl}/people`)
            .then(res => {
                if (res.status !== 200) {
                    console.error('Uh oh. The webtask did not work!')
                    return
                }

                res.json().then(json => {
                    this.setState({people: json})
                })
            })
            .catch(e => console.error(e))
    }

    render() {
        const {people} = this.state

        return (
            <div>
                {Object.keys(people).map(groupName => (
                    <Group key={groupName} title={groupName} collection={people[groupName]} />
                ))}
            </div>
        )
    }
}
