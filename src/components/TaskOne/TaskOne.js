import React from 'react'
import classes from './TaskOne.modules.css'
import {Link, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'

const TaskOne = (props) => {

    const id = props.match.params.id
    const tasks = props.tasks
    const taskOne = tasks.filter( (task) => task.id.toString() === id.toString())
    // при перезагрузке будет редиректить 
    let isDataAvailable = true
    if (taskOne.length === 0) { 
        isDataAvailable = false
    }
    const cls = []
    if (props.change) {
        cls.push(classes.TaskOne)
    } else {
        cls.push(classes.TaskOneBlack)
    }
    const clsToHome = []
    if (props.change) {
        clsToHome.push(classes.toHome)
    } else {
        clsToHome.push(classes.toHomeBlack)
    }

    return (
        <React.Fragment>
            {
                isDataAvailable ? // редирект или нет
                <React.Fragment>
                    <div className={classes.AroundLink}>
                        <Link to={'/'} style={{textDecoration: 'none'}} >  <div className={ clsToHome.join(' ') }> <strong> Назад </strong> </div> </Link>
                    </div>

                    <div className={cls.join(' ')}>
                        <h1> Your Task </h1>
                        <h2> {taskOne[0].descr} <p> Дата создания: { taskOne[0].date } </p></h2>
                    </div> 
                </React.Fragment>
                : 
                <Redirect
                    to={{
                        pathname: "/"
                    }}
                />
            }
        </React.Fragment>
    )
}

function mapStateToProps(state) {
    return {
        tasks: state.tasks.tasks,
        change: state.layout.change,
    }
}

export default connect(mapStateToProps)(TaskOne)