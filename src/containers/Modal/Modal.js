import React from 'react'
import classes from './Modal.modules.css'
import {connect} from 'react-redux'

class Modal extends React.Component  {

    state = {
        newTask: null,
        valueInput: '',
        disabled: true
    }
    changeHandler = (value) => {
            const tasks = [...this.props.tasksInfo]
            const taskId = this.props.modalInfo.taskId
            const changingTask = tasks.filter( task => task.id === taskId)
            const NewChangingTask = changingTask[0]
            NewChangingTask.descr = value
            this.setState({
                newTask: NewChangingTask,
                valueInput: value,
                disabled: false
            })     
    }

    setValue() {
        const tasks = [...this.props.tasksInfo]
        const taskId = this.props.modalInfo.taskId
        const changingTask = tasks.filter( task => task.id === taskId)
        const NewChangingTask = changingTask[0]
        return NewChangingTask.descr 
    }

    render() {
        const cls = []
        if (this.props.changeTheme) {
            cls.push(classes.whiteModal)
        } else {
            cls.push(classes.blackModal)
        }
        const clsInto = []
        if (this.props.changeTheme) {
            clsInto.push(classes.whiteIntoModal)
        } else {
            clsInto.push(classes.blackIntoModal)
        }
        return (
            <div className={cls.join(' ')}>
                <div className={clsInto.join(' ')}> 
                    Редактирование таска
                    <form>
                        <input  
                            value={this.setValue()}
                            className={classes.inputModal}
                            placeholder="описание задания" 
                            onChange={event => this.changeHandler(event.target.value)}
                        />
                    </form>
                
                    <button
                        disabled={this.state.disabled} 
                        className={classes.buttonModal} 
                        onClick={() => this.props.updated(this.state.newTask)}>
                        Update
                    </button>

                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return  {
        // state, который мы хотим здесь применять
        openModal: state.tasks.openModal,
        loader: state.tasks.loader,
        tasks: state.tasks.tasks,
    }
}


export default connect(mapStateToProps)(Modal)

