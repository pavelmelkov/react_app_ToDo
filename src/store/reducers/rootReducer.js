import {combineReducers} from 'redux'

import tasksReducer from './tasks'
import authReducer from './auth'
import layoutReducer from './layout'

export default combineReducers({
    tasks: tasksReducer,
    auth: authReducer,

    layout: layoutReducer,
})
