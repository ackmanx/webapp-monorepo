import React from 'react'
import SubGroup from './sub-group'

export default class Group extends React.Component {
    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                {Object.keys(this.props.collection).map(subgroupName => (
                    <SubGroup key={subgroupName} title={subgroupName} creatures={this.props.collection[subgroupName]} />
                ))}
            </div>
        )
    }
}
