// import './app.css'
import React, {useContext} from 'react'
import AppContext from './app-context'

export const Things = () => {
    const appContext = useContext(AppContext)

    return appContext.map(thing => <h3>{thing.title}</h3>)
}
