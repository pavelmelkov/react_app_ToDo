import React from 'react'
import classes from './MenuToggle.modules.css'

import {connect} from 'react-redux'
 
const MenuToggle = props => {

    let styleClass 
    if (props.change) {
        styleClass = classes.MenuToggle
    } else {
        styleClass = classes.MenuToggleBlack
    }
    // изначально это бургер, который расположен слева
    const cls = [
        styleClass,
        'fa',
    ]
    // затем, когда menu: true, то значок - это крестик с классом open, который 
    if (props.isOpen) {
        cls.push('fa-times') 
        cls.push(classes.open)
    } else { 
        // когда menu: false, то это бургер с начальными классами
        cls.push('fa-bars')
    }   
    return (
        // элемент, который меняет state menu на противоположный
        <i
            className={cls.join(' ')}
            onClick={props.onToggle}
        />
    )
}

function mapStateToProps(state) {
    return {
        change: state.layout.change
    }
}

export default connect(mapStateToProps)(MenuToggle)