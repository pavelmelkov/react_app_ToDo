import {
    SET_TASK, 
    RESET_TASK, 
    FETCH_TASKS_START, 
    FETCH_TASKS_SUCCESS , 
    FETCH_TASKS_ERROR, 
    SUCCESS_CREATED_TASK, 
    UPDATE_TASK, 
    OPEN_MODAL, 
    CLOSE_MODAL,
    DELETE_TASK,
    AUTH_LOGOUT,
    NEW_CHECK
}   from '../actions/actionTypes'

const initialState = {
    openModal: {
        open: false,
        taskId: null
    },
    loader: false,
    tasks: [],
    task: null,
}

export default function tasksReducer(state = initialState, action) {
    switch (action.type) {
        case NEW_CHECK: 
            return {
                ...state, tasks: action.newTasks
            }
        case AUTH_LOGOUT: 
            return {
                ...state, tasks: []
            }
        case DELETE_TASK: 
            return {
                ...state, tasks: action.newTasks
            }
        case OPEN_MODAL: 
            return {
                ...state,  openModal: {...state.openModal, open: true, taskId: action.id}
            }
        case CLOSE_MODAL: 
            return {
                ...state, openModal: {...state.openModal, open: false, taskId: null}
            }
        case UPDATE_TASK:
            return {
                ...state, tasks: action.tasks
            }
        case SUCCESS_CREATED_TASK: 
            return {
                ...state,  tasks: [...state.tasks, action.task]
            }
        case SET_TASK:
            return {
                ...state, task: action.task
            }
        case RESET_TASK:
            return {
                ...state, task: null
            }
        
        case FETCH_TASKS_START:
            return {
                ...state, loader: true
            }

        case FETCH_TASKS_SUCCESS:
            return {
                ...state, tasks: action.tasks, loader: false
             }
        case FETCH_TASKS_ERROR:
            return {
                ...state, error: action.error
                }
        default:
            return state
    }
}

