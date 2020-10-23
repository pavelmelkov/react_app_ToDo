import React from 'react'
import classes from './TaskList.modules.css'
import {connect} from 'react-redux'

import Task from '../../components/Task/Task'
import Modal from '../../containers/Modal/Modal'

import ButtonMobile from '../../components/UI/ButtonMobile/ButtonMobile'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import {createFormTask, validate} from '../../form/FormFramework'

import Backdrop from '../../components/UI/Backdrop/Backdrop'
import { addTaskToDB, fetchTasks, createTask, updatedTask, modalOpen, closeModal, taskRemove, check } from '../../store/actions/tasks'
import {toggleChange} from '../../store/actions/layout'

class TaskList extends React.Component {
   
    state = {
        formtask: createFormTask(
            {
                label: 'Введите задание',
                errorMessage: 'Поле не должно быть пустым'
            },
            {required: true}
        )
    }

    async componentDidMount() { 
        // получаем данные юзера по ссылке 
        this.props.fetchTasks()
        // будет идти загрузга тасков с бд
    }

    addTask = () => {
        // const token = localStorage.getItem('token')
        // console.log()
        // будем помещать данные из formtask в массив тасков
        // очистка formtask
        if (!localStorage.getItem('userId')) {
            alert('Необходимо авторизоваться!')
        }
        if (this.state.formtask.valid && localStorage.getItem('userId')) {
            const tasks = [...this.props.tasks]
            const length = tasks.length
            const taskId = length + Math.floor(Math.random() * 10000)
            console.log('taskId ', taskId)
            const newTask = {
                id: taskId,
                descr: this.state.formtask.value,
                date: new Date().toLocaleDateString(),
                checked: false
            }
             // добавляем таск в state
            this.props.addTaskToDB(newTask) // берем таск из state, добавляем через post в массив tasks, удаляем таск из state

            this.setState({
                formtask: createFormTask(   
                {
                    label: 'Введите задание',
                    errorMessage: 'Поле не должно быть пустым'
                },
                {required: true})
            })
        } 
    }
    changeHandler = (value) => {
        const formControl = {...this.state.formtask}
        formControl.touched = true
        formControl.value = value
        formControl.valid = validate(formControl.value, formControl.validation)
        //  function validate(value, validation = null) {
        //     if (!validation) {
        //         return true                              // возвращает true, если поле не должно валидироваться
        //     }
        //     let isValid = true
        //     if (validation.required) {                   // если валидация должна быть - required: true
        //         isValid = value.trim() !== '' && isValid // вернет true, если значение не пустое 
        //     }
        //     return isValid                               // возвращается true или false, в зависимости от наличия символов
        // }
         // функция action
        this.setState( {
            formtask: formControl,
        } )
    }

    updateTask = (updatedTask) => {
        // передаем из компонента модалки обновленный таск и заменяем его на таск в state
        if (updatedTask.descr !== null) {
            this.props.updatedTask(updatedTask)
        }
    }

    openModalToUpdateTask = (id) => { // переменная, которая будет открывать компонент модалки
         // функция action
        this.props.modalOpen(id)
    }
   
    removeTask = (id) => {
        const tasks = [...this.props.tasks]
        const newTasks = tasks.filter( task => task.id !== id)
        // функция action, меням state, добавляем в БД
        this.props.taskRemove(newTasks)
    }

    checkedTask = (id) => {
        const tasks = [...this.props.tasks]
        const newTasks = tasks.map( (task) => {
            if (task.id === id) {
                const checked = task.checked
                task.checked = !checked
            }  
            return task
        }) 
        // меням поле checked таска, путем переобновления state и заносим данные в БД
        this.props.check(newTasks)
    }

    modalClose = () => {
        this.props.closeModal()
    }

    renderTasks(tasks) {

        const clsTask = []
        if (this.props.change) {
            clsTask.push(classes.TaskWhite)
        } else {
            clsTask.push(classes.TaskBlack)
        }

        return tasks.map( (task, index) => {
            return (
                <div className={clsTask.join(' ')} key={task.id}>
                    <Task 
                        changeTheme={this.props.change}
                        key={task.id}
                        checkedTask={task.checked}
                        date={task.date}
                        descr={ task.descr } 
                        details = { task.details } 
                        id={task.id} 
                        checked={() => this.checkedTask(task.id)} 
                        delete={ () => this.removeTask(task.id)}
                        update={() => this.openModalToUpdateTask(task.id)}
                    />
                </div>
            )
        })
    }
    render() {

        const clsBox = []
        if (this.props.change) {
            clsBox.push(classes.BoxWhite)
        } else {
            clsBox.push(classes.BoxBlack)
        }

        const clsTaskList = []
        if (this.props.change) {
            clsTaskList.push(classes.TaskListWhite)
        } else {
            clsTaskList.push(classes.TaskListBlack)
        }

        const clsTasks = []
        if (this.props.change) {
            clsTasks.push(classes.TasksWhite)
        } else {
            clsTasks.push(classes.TasksBlack)
        }

        const clsh1 = []
        if (this.props.change) {
            clsh1.push(classes.h1White)
        } else {
            clsh1.push(classes.h1Black)
        }

        const clsForm = []
        if (this.props.change) {
            clsForm.push(classes.FormWhite)
        } else {
            clsForm.push(classes.FormBlack)
        }

        const clsNoTasks = []
        if (this.props.change) {
            clsNoTasks.push(classes.noTaskInscriptionWhite)
        } else {
            clsNoTasks.push(classes.noTaskInscriptionBlack)
        }

        return(
            <React.Fragment>
               
                { this.props.openModal.open ? <Backdrop onClick={this.modalClose}/> : null }
            <div className={clsTaskList.join(' ')}>
                <h1 className={clsh1.join(' ')}>  
                    ToDo List
                </h1>

                <div className={clsForm.join(' ')}>
                    <form onSubmit={(e) => {e.preventDefault()}}>
                        <div className={classes.mobileWrapper}>
                            <div>
                                <Input 
                                // передаем в formtask данные для изменения классов и свойств input
                                    change={this.props.change}
                                    label={this.state.formtask.label} 
                                    value={this.state.formtask.value}
                                    valid={this.state.formtask.valid}
                                    shouldValidate = {!!this.state.formtask.validation}
                                    touched={this.state.formtask.touched}
                                    errorMessage={this.state.formtask.errorMessage}
                                    onChange={event => this.changeHandler(event.target.value)}
                                />
                            </div>
                            <div>
                                <ButtonMobile 
                                    type="primary" 
                                    disabled={false}
                                    onClick={this.addTask}
                                    >
                                        Cоздать
                                </ButtonMobile>
                            </div>
                        </div>

                        <Button 
                            id="form"
                            type="primary" 
                             disabled={false}
                            onClick={this.addTask}
                        > Создать </Button>
                        
                    </form>
                </div>

                {/* блок смены темы при достижении экрана 572px, чтобы показать, в @media ставим  display:block; */}
                
                    <div className={classes.changeThemeDiv} onClick={() => this.props.toggleChange(!this.props.change)}>
                        <div className={classes.boxThemeDiv}> 
                             Сменить стиль
                        </div>
                    </div>
                
                { this.props.openModal.open ? <div> <Modal changeTheme={this.props.change} updated={this.updateTask} modalInfo={this.props.openModal} tasksInfo={this.props.tasks}/> </div> : null } 

                <div className={clsBox.join(' ')}>
                    <div className={clsTasks.join(' ')}>
                        { this.props.tasks.length ? this.renderTasks(this.props.tasks)  : <p> <strong className={clsNoTasks.join(' ')}> Заданий нет </strong> </p>}
                    </div>
                </div>
               
            </div>
           
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    return  {
        // state, который мы хотим здесь применять
        openModal: state.tasks.openModal,
        loader: state.tasks.loader,
        tasks: state.tasks.tasks,
        change: state.layout.change,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchTasks: () => dispatch(fetchTasks()),
        addTaskToDB: (task) => dispatch(addTaskToDB(task)),
        createTask: () => dispatch(createTask()),
        updatedTask: (task) => dispatch(updatedTask(task)),
        modalOpen: (id) => dispatch(modalOpen(id)),
        closeModal: () => dispatch(closeModal()),
        taskRemove: (newTasks) => dispatch(taskRemove(newTasks)),
        check: (newTasks) => dispatch(check(newTasks)),
        toggleChange: (toggle) => dispatch(toggleChange(toggle)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList)