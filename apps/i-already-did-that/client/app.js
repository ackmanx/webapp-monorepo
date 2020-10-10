import './app.css'
import React, {useEffect, useState} from 'react'
import AppContext from './app-context'
import {Things} from './things'
import {MenuBar} from './menu-bar'

export const App = () => {
    const [appState, setAppState] = useState({})

    useEffect(() => {
        async function handleFetch() {
            const response = await fetch('something')
            setAppState(await response.json())
        }

        handleFetch()
    }, [setAppState])

    if (!Array.isArray(appState)) return null

    return (
        <AppContext.Provider value={appState}>
            <MenuBar />
            <Things />
        </AppContext.Provider>
    )
}
