import React from 'react'
import './app.css'
import {ConnectedSidebar} from '../sidebar/sidebar'
import {ConnectedEntries} from '../entries/entries'

export class App extends React.Component {
    render() {
        return (
            <div className='app'>
                <ConnectedSidebar />
                <ConnectedEntries />
            </div>
        )
    }
}
