import {
    SET_TASK, 
    RESET_TASK, 
    FETCH_TASKS_START, 
    FETCH_TASKS_SUCCESS, 
    FETCH_TASKS_ERROR, 
    SUCCESS_CREATED_TASK, 
    UPDATE_TASK,
    CLOSE_MODAL, 
    OPEN_MODAL,
    DELETE_TASK,
    NEW_CHECK,
} from './actionTypes'
import axios from 'axios'

export function fetchTasks() {
    // брать таски из бд 
    return async dispatch => {
        dispatch(fetchTasksStart())
        try {
            // получаем userId и добавляем к url перед tasks
            const userId = localStorage.getItem('userId')
            const response = await axios.get(`https://todo-9e5aa.firebaseio.com/${userId}/tasks.json`) 

            const tasks = []

            Object.keys(response.data).forEach((key, index) => { 
                tasks.push(response.data[key])
            });

            dispatch(fetchTasksSuccess(tasks))
        } catch (error) {
            dispatch(fetchTasksError(error))
        }
    }
}

export function updatedTask(updatedTask) {
    return async (dispatch, getState) => {
        // замена таска в state на обновленный
        const tasks = getState().tasks.tasks
        const newTasks = tasks.filter( (task) => task.id !== updatedTask.id)
        newTasks.push(updatedTask)
        dispatch(updateTaskState(newTasks))

        // обновление БД
        // получаем userId и добавляем к url перед tasks
        const userId = localStorage.getItem('userId')
        await axios.put(`https://todo-9e5aa.firebaseio.com/${userId}/tasks.json`, newTasks) // полностью перезаписываю новый массив тасков
        
    }
}

export function taskRemove(newTasks) {
    return async dispatch => {
        dispatch(deleteTask(newTasks))
         // получаем userId и добавляем к url перед tasks
         const userId = localStorage.getItem('userId')
        await axios.put(`https://todo-9e5aa.firebaseio.com/${userId}/tasks.json`, newTasks)
    }
}

export function check(newTasks) {
    return async dispatch => {
        dispatch(newCheck(newTasks))
        const userId = localStorage.getItem('userId')
        await axios.put(`https://todo-9e5aa.firebaseio.com/${userId}/tasks.json`, newTasks)
    }
}

export function newCheck(newTasks) {
    return {
        type: NEW_CHECK,
        newTasks
    }
}

export function deleteTask(newTasks) {
    return {
        type: DELETE_TASK,
        newTasks
    }
}

export function modalOpen(id) {
    return {
        type: OPEN_MODAL,
        id
    }
}

export function closeModal() {
    return {
        type: CLOSE_MODAL
    }
}

export function updateTaskState(tasks) {
    return {
        type: UPDATE_TASK,
        tasks
    }
}

export function createTask(task) {
    return {
        type: SET_TASK,
        task
    }
}

export function resetTask() {
    return {
        type: RESET_TASK
    }
}

export function addTaskToDB(task) {
    // добавляем в state новый таск 
    // обновляем БД
    return async (dispatch, getState) => {
        dispatch(createTask(task))

        // получаем userId и добавляем к url перед tasks
        const userId = localStorage.getItem('userId')
        await axios.post(`https://todo-9e5aa.firebaseio.com/${userId}/tasks.json`, getState().tasks.task)

        dispatch(successCreateTask(task))
        dispatch(resetTask())
    }
}

// export function 

export function successCreateTask(task) {
    return {
        type: SUCCESS_CREATED_TASK,
        task
    }
}
export function fetchTasksStart() {
    return {
        type: FETCH_TASKS_START
    }
}

export function fetchTasksSuccess(tasks) {
    return {
        type: FETCH_TASKS_SUCCESS,
        tasks
    }
}

export function fetchTasksError(error) {
    return {
        type: FETCH_TASKS_ERROR,
        error: error
    }
}