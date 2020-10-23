import React from 'react'
import classes from './StyleButton.modules.css'

const StyleButton = (props) => {
    const cls = [
        classes.Button,
        classes[props.type]
    ]
    return (
        <div className={classes.Together}>
            <button
                onClick={props.onClick}
                className={cls.join(' ')}
                disabled={props.disabled}
            >
                {props.children}
            </button>
            <p style={{textAlign:'center', fontStyle: 'italic', fontSize: '11px',}}> Сменить <br/> стиль </p>
        </div>
    )
}

export default StyleButton