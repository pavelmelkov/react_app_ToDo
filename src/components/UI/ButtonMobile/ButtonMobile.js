import React from 'react'
import classes from './ButtonMobile.modules.css'

const ButtonMobile = (props) => {
    const cls = [
        classes.ButtonMobile,
        classes[props.type]
    ]
    return (
        <button
            onClick={props.onClick}
            className={cls.join(' ')}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    )
}

export default ButtonMobile