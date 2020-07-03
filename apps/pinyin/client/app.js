import './app.css'
import React, {useEffect, useRef} from 'react'
import {convertToneNumbersToAccents} from './utils/convert-accents'

export const App = () => {
    const textareaEl = useRef(null)

    useEffect(() => {
        if (textareaEl.current) {
            textareaEl.current.focus()
            textareaEl.current.value = localStorage.getItem('text')
        }
    }, [])

    const handleKeyUp = e => {
        const textarea = e.target
        textarea.value = convertToneNumbersToAccents(textarea.value)
        localStorage.setItem('text', textarea.value)
    }

    return <textarea ref={textareaEl} onKeyUp={handleKeyUp} />
}
