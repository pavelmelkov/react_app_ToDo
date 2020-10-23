import React from 'react'
import classes from './Button.modules.css'

const Button = (props) => {

    
    const cls = [
        classes[props.type]
    ]

    if (props.id === 'auth') {
        cls.push(classes.ButtonAuth)
    } 

    const clsForm = []
    if (props.id === 'form') {
        clsForm.push(classes.Button)
    }

    const clsAction = []
    if (props.id === 'action') {
        clsAction.push(classes.ButtonAction)
    }

    
    return (
        <button
            onClick={props.onClick}
            className={cls.join(' ') + ' ' + clsAction.join(' ') + ' ' + clsForm.join(' ') }
            disabled={props.disabled}
        >
            {props.children}
        </button>
    )
}

export default Button