import './menu-bar.css'
import React, {useCallback, useState} from 'react'

export const MenuBar = () => {
    const [showAddThing, setShowAddThing] = useState(false)

    const handleAddThing = useCallback(() => {
        setShowAddThing(!showAddThing)
    }, [showAddThing])

    return (
        <div className='menu-bar'>
            <button onClick={handleAddThing}>Thing++</button>
            {showAddThing && <h1>Add Thing</h1>}
        </div>
    )
}
