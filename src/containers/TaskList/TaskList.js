import React from 'react'
import classes from './TaskList.modules.css'

export default class TaskList extends React.Component {

    render() {

        return(
            <div className={classes.Tasks}>
                <h1> Список заданий</h1>
            </div>
        )

    }
}