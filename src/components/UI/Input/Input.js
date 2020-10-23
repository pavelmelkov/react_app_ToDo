import React from 'react'
import classes from './Input.modules.css'

import {connect} from 'react-redux'

function isInvalid({valid, touched, shouldValidate}) {
    // console.log('in input valid', valid)
    // console.log('in input touched', touched)
    // console.log('in input shouldValidate', shouldValidate)
    // console.log('in input result!',!valid && shouldValidate && touched)
    return !valid && shouldValidate && touched
}
const Input = props => {
const InputType = props.type || 'text'
const cls = [classes.Input]
const htmlFor = `${InputType}-${Math.random()}`

    if (isInvalid(props)) {
        cls.push(classes.invalid)
    }

    let clsLabel = []
    if (props.change) {
        clsLabel.push(classes.labelWhite)
    } else {
        clsLabel.push(classes.labelBlack)
    }
    
    return (
        <div className={cls.join(' ')}>
            <label htmlFor={htmlFor} className={clsLabel.join(' ')}> {props.label} </label>
            <input 
                type={InputType} 
                id={htmlFor}
                value={props.value}
                onChange={props.onChange}
            />
            {   
                isInvalid(props) ?
                <span> {props.errorMessage  || "Введите верное значение!"} </span>
                : null
            }
        </div>   
    )
}

function mapStateToProps(state) {
    return {
        change: state.layout.change
    }
}

export default connect(mapStateToProps)(Input)