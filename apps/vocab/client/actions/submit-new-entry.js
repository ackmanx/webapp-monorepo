import {trim} from '../dumping-grounds'
import {submit_new_entry_payload, submit_new_entry_start, submit_new_entry_stop} from './action-types'
import {getAllEntries} from './get-all-entries'

export function submitNewEntry() {
    return (dispatch, getState) => {
        dispatch({type: submit_new_entry_start})

        const state = getState()
        const body = {
            categoryId: state.app.currentCategoryId,
            hanzi: trim(state.buffer.hanzi),
            pinyin: trim(state.buffer.pinyin),
            english: trim(state.buffer.english),
        }

        fetch('/entry', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
            .then(res => {
                if (res.status !== 200) {
                    console.error('Uh oh!')
                    return
                }

                res.json().then(json => {
                    dispatch({type: submit_new_entry_payload})
                    dispatch(getAllEntries())
                })
            })
            .catch(e => console.error(e))
            .finally(() => dispatch({type: submit_new_entry_stop}))
    }
}
