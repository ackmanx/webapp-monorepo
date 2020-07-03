import {
    cancel_new_category,
    get_all_entries_payload,
    get_categories_payload,
    new_category_placeholder,
    show_category,
    submit_new_category_payload,
    submit_new_entry_payload,
    update_add_entry_buffer,
} from './actions/action-types'

export function app(state = {}, action = {}) {
    switch (action.type) {
        case show_category:
            return {...state, currentCategoryId: action.categoryId}

        default:
            return state
    }
}

export function buffer(state = {}, action = {}) {
    switch (action.type) {
        case update_add_entry_buffer:
            let isValid = false

            let validInputs = 0
            if (state.hanzi) validInputs++
            if (state.pinyin) validInputs++
            if (state.english) validInputs++
            if (validInputs >= 2) isValid = true

            return {...state, [action.label]: action.value, isValid}

        case submit_new_entry_payload:
            return {hanzi: '', pinyin: '', english: '', isValid: false}

        default:
            return state
    }
}

export function categories(state = {}, action = {}) {
    switch (action.type) {
        case get_categories_payload:
            return {...state, data: action.categories}

        case new_category_placeholder:
            return {...state, showNewCategoryPlaceholder: true}

        case submit_new_category_payload:
            return {...state, showNewCategoryPlaceholder: false, name: ''}

        case cancel_new_category:
            return {...state, showNewCategoryPlaceholder: false, name: ''}

        default:
            return state
    }
}

export function entries(state = {}, action = {}) {
    switch (action.type) {
        case get_all_entries_payload:
            return {...state, data: action.entries}

        default:
            return state
    }
}
