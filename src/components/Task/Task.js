import React from 'react'
import classes from './Task.modules.css'
import {NavLink} from 'react-router-dom'

import Button from '../UI/Button/Button'

const Task = props => {

        const clsIconPencil = [
            'fa',
            'fa-pencil',
        ]
        if (!props.changeTheme) {
            clsIconPencil.push(classes.whiteIcon)
        }

        const clsIconCheck = [
            'fa',
            'fa-check',
        ]
        if (!props.changeTheme) {
            clsIconCheck.push(classes.whiteIcon)
        }

        const clsIconTimes = [
            'fa',
            'fa-times',
        ]
        if (!props.changeTheme) {
            clsIconTimes.push(classes.whiteIcon)
        }

        const cls = [ null ]
        if (props.checkedTask) {
            cls.push(classes.checked)
        } 

        const clsTheme = []
        if (props.changeTheme) {
            clsTheme.push(classes.WhiteTheme)
        } else {
            clsTheme.push(classes.BlackTheme)
        }

        return(
            <div className={classes.Task}>
                
                <div className={classes.Edit}>
                    <Button 
                        id='action'
                        onClick={props.update}
                        type="checked_delete"
                    >   
                    <div className={classes.IconWrapper}>
                         <i className={clsIconPencil.join(' ')} aria-hidden="true"></i>
                    </div>
                    </Button>
                </div>
              
            <NavLink 
                to={{ pathname:`/tasks/${props.id}` }} 
                style={{textDecoration: 'none'}}
            >
                <div className={classes.descr}>
                    <p className={cls.join(' ') + ' ' + clsTheme.join(' ')}> { props.descr.slice(0, 40)} {(props.descr.length > 40) ? '...' : null} </p>
                </div>
               
            </NavLink>
            <div className={classes.Checked}>
                <Button 
                    id='action'
                    onClick={props.checked}
                    type="checked_delete"
                >
                    <div className={classes.IconWrapper}>
                        <i className={clsIconCheck.join(' ')} aria-hidden="true"/>
                    </div>
                   
                </Button>
            </div>

            <div className={classes.Delete}>
                <Button
                    id='action'
                    disabled={!props.checkedTask}
                    onClick={ props.delete }
                    type="checked_delete"
                >
                 <div className={classes.IconWrapper}>
                    <i className={clsIconTimes.join(' ')} aria-hidden="true"/>
                 </div>
                   
                 </Button>
            </div>   
        </div>
        )
}

export default Task