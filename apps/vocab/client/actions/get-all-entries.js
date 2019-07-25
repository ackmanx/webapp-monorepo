import {get_all_entries_payload, get_all_entries_start, get_all_entries_stop} from './action-types'

export function getAllEntries() {
    return dispatch => {
        dispatch({type: get_all_entries_start})

        fetch('/entry')
            .then(res => {
                if (res.status !== 200) {
                    console.error('Uh oh!')
                    return
                }

                res.json().then(json => dispatch({type: get_all_entries_payload, entries: json}))
            })
            .catch(e => console.error(e))
            .finally(() => dispatch({type: get_all_entries_stop}))
    }
}
