import React from 'react'
import Creature from './creature'

export default class SubGroup extends React.Component {
    render() {
        return (
            <div>
                <h2>{this.props.title}</h2>
                <ul>
                    {this.props.creatures.map(creature => (
                        <Creature key={creature.name} creature={creature} />
                    ))}
                </ul>
            </div>
        )
    }
}
