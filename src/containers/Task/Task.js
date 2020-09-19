import React from 'react'
import classes from './Task.modules.css'

export default class Task extends React.Component {

    render() {

        return(
            <div className={classes.Task}>
                <h1> Задание в деталях </h1>
            </div>
        )

    }
}