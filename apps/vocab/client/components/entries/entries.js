import React from 'react'
import './entries.css'
import {connect} from 'react-redux'
import {getAllEntries} from '../../actions/get-all-entries'
import {ConnectedAddNewEntry} from '../add-new-entry/add-new-entry'
import {v4 as uuid} from 'uuid'
import editIcon from '../../images/edit.png'
import deleteIcon from '../../images/delete.png'
import {deleteEntry} from '../../actions/delete-entry'

export class Entries extends React.Component {
    static defaultProps = {
        entries: {}
    }

    state = {
        showMenu: false,
    }

    constructor(props) {
        super(props)
        this.toggleMenu = this.toggleMenu.bind(this)
        props.getAllEntries()
    }

    render() {
        const {currentCategoryId, entries, deleteEntryAction} = this.props

        let entriesToShow = entries[currentCategoryId] || []

        if (currentCategoryId === 'ALL') {
            Object.keys(entries).forEach(categoryId => {
                entriesToShow = entriesToShow.concat(entries[categoryId])
            })
        }

        return (
            <div className='entries-panel'>
                {currentCategoryId !== 'ALL' && <ConnectedAddNewEntry/>}
                {entriesToShow.map(entry => {
                    const showMenuForEntry = this.state.showMenu && this.state.menuId === entry.id
                    return (
                        <div key={uuid()} className='entry'>
                            <div className={`menu ${showMenuForEntry ? 'menu--open' : ''}`}>
                                {!showMenuForEntry && <button onClick={() => this.toggleMenu(entry.id)}>...</button>}
                                {showMenuForEntry && (
                                    <div>
                                        <img src={editIcon} alt='edit' onClick={this.toggleMenu}/>
                                        <img src={deleteIcon} alt='delete' onClick={() => deleteEntryAction(entry.id, entry.categoryId)}/>
                                    </div>
                                )}
                            </div>
                            <div>{entry.hanzi}</div>
                            <div>{entry.pinyin}</div>
                            <div className='english'>{entry.english}</div>
                        </div>
                    )
                })}
            </div>
        )
    }

    toggleMenu(id) {
        this.setState({
            showMenu: !this.state.showMenu,
            menuId: typeof id === 'string' ? id : null,
        })
    }
}

const mapStateToProps = state => ({
    entries: state.entries.data,
    currentCategoryId: state.app.currentCategoryId,
})

const mapDispatchToProps = dispatch => ({
    getAllEntries: () => dispatch(getAllEntries()),
    deleteEntryAction: (entryId, categoryId) => dispatch(deleteEntry(entryId, categoryId)),
})

export const ConnectedEntries = connect(mapStateToProps, mapDispatchToProps)(Entries)
