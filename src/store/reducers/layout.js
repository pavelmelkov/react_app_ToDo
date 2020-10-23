import {TOGGLE_CHANGE} from '../actions/actionTypes'

const initialState = {
    change: true
}

export default function layoutReducer(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_CHANGE:
            return {
                ...state, change: action.newToggle
            }
        default:
            return state
    }
}