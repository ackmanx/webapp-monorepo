import React from 'react'
import moment from 'moment'

export default class Creature extends React.Component {
    render() {
        const creature = this.props.creature
        const ageDetails = this.getAgeDetails(creature.birthday)

        return (
            <li key={creature.name}>
                <div>{creature.name}</div>
                {ageDetails.notBornYet && <div>in {ageDetails.duration}</div>}
                {!ageDetails.notBornYet && <div>{ageDetails.duration}</div>}
            </li>
        )
    }

    getAgeDetails(birthday) {
        const millisecondsAlive = moment() - moment(birthday)
        const duration = moment.duration(millisecondsAlive)

        return {
            duration: `${duration.years()} years old`,
            notBornYet: millisecondsAlive < 0,
        }
    }
}
