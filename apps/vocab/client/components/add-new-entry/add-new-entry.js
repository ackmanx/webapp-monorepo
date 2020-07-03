import React from 'react'
import './add-new-entry.css'
import {connect} from 'react-redux'
import {submitNewEntry} from '../../actions/submit-new-entry'
import {update_add_entry_buffer} from '../../actions/action-types'

export class AddNewEntry extends React.Component {
    constructor(props) {
        super(props)
        this.updateValue = this.updateValue.bind(this)
        this.validateAndSubmit = this.validateAndSubmit.bind(this)
    }

    render() {
        const {hanzi, pinyin, english, isValid} = this.props

        return (
            <form className='add-new-entry'>
                <div className='inputs'>
                    <div className='group'>
                        <label>hanzi</label>
                        <input type='text' value={hanzi} onChange={event => this.updateValue(event, 'hanzi')} />
                    </div>
                    <div className='group'>
                        <label>pinyin</label>
                        <input type='text' value={pinyin} onChange={event => this.updateValue(event, 'pinyin')} />
                    </div>
                    <div className='group'>
                        <label>english</label>
                        <input type='text' value={english} onChange={event => this.updateValue(event, 'english')} />
                    </div>
                </div>
                <div className='submit'>
                    <button disabled={!isValid} onClick={this.validateAndSubmit}>
                        Add
                    </button>
                </div>
            </form>
        )
    }

    updateValue(event, label) {
        this.props.updateValueAction(label, event.target.value)
    }

    validateAndSubmit(event) {
        //Being my button is in a form, I'm banking on the Enter key submitting the form. As a result though, I need to prevent page reload
        event.preventDefault()

        if (this.props.isValid) {
            this.props.submitNewEntryAction()
        }
    }
}

const mapStateToProps = state => ({
    buffer: state.buffer,
    hanzi: state.buffer.hanzi,
    pinyin: state.buffer.pinyin,
    english: state.buffer.english,
    isValid: state.buffer.isValid,
})

const mapDispatchToProps = dispatch => ({
    updateValueAction: (label, value) => dispatch({type: update_add_entry_buffer, label, value}),
    submitNewEntryAction: () => dispatch(submitNewEntry()),
})

export const ConnectedAddNewEntry = connect(mapStateToProps, mapDispatchToProps)(AddNewEntry)
