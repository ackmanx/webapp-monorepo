import {get_categories_payload, get_categories_start, get_categories_stop} from './action-types'

export function getCategories() {
    return dispatch => {
        dispatch({type: get_categories_start})

        fetch('/category')
            .then(res => {
                if (res.status !== 200) {
                    console.error('Uh oh. The webtask did not work!')
                    return
                }

                res.json().then(json => dispatch({type: get_categories_payload, categories: json}))
            })
            .catch(e => console.error(e))
            .finally(() => dispatch({type: get_categories_stop}))
    }
}
