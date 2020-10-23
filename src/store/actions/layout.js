import { TOGGLE_CHANGE } from "./actionTypes"

export function toggleChange(toggle) {
    const newToggle = toggle
    return {
        type: TOGGLE_CHANGE,
        newToggle
    }
}

