import {trim} from '../dumping-grounds'
import {submit_new_category_payload, submit_new_category_start, submit_new_category_stop} from './action-types'
import {getCategories} from './get-categories'

export function submitNewCategory(name) {
    return dispatch => {
        dispatch({type: submit_new_category_start})

        fetch('/category',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name: trim(name)}),
            })
            .then(res => {
                if (res.status !== 200) {
                    console.error('Uh oh. The webtask did not work!')
                    return
                }

                res.json().then(json => {
                    dispatch({type: submit_new_category_payload})
                    dispatch(getCategories())
                })
            })
            .catch(e => console.error(e))
            .finally(() => dispatch({type: submit_new_category_stop}))
    }
}
