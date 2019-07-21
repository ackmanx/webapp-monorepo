import './app.css'
import React, {useEffect, useRef} from 'react'
import {convertToneNumbersToAccents} from './utils/convert-accents'

export const App = () => {

    const textareaEl = useRef(null)

    useEffect(() => {
        if (textareaEl.current) {
            textareaEl.current.focus()
        }
    }, [])

    const handleKeyUp = e => {
        const textarea = e.target
        textarea.value = convertToneNumbersToAccents(textarea.value)
    }

    return (
        <textarea ref={textareaEl} onKeyUp={handleKeyUp}/>
    )
}
