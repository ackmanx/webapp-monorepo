import {getAllEntries} from './get-all-entries'
import {delete_entry_payload, delete_entry_start, delete_entry_stop} from './action-types'

export function deleteEntry(entryId, categoryId) {
    return dispatch => {
        dispatch({type: delete_entry_start})

        const body = {
            entryId,
            categoryId,
        }

        fetch('/entry', {
            method: 'DELETE',
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
                    dispatch({type: delete_entry_payload})
                    dispatch(getAllEntries())
                })
            })
            .catch(e => console.error(e))
            .finally(() => dispatch({type: delete_entry_stop}))
    }
}
