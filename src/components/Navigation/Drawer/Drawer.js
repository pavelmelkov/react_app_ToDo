import React from 'react'
import classes from './Drawer.modules.css'
import Backdrop from '../../UI/Backdrop/Backdrop'
import {NavLink} from 'react-router-dom'

import {connect} from 'react-redux'

class Drawer extends React.Component { // компонент отрисовывания ссылок

    
    clickHandler = () => { // функция, которая вызыввает метод, устанавливает  - menu: false
        this.props.onClose()
    }
    
    renderLinks(links) { // рендер списка ссылок
        return links.map( (link, index)=> {
            return(
                <li
                    key={index}
                >
                    <NavLink  // передаем параметры в навлинк
                        to={link.to}
                        exact={link.exact}
                        activeClassName={classes.active} // стиль активной ссылки
                        onClick={this.clickHandler} // функция, нажатие ихменяет state menu на false
                    > 
                        {link.label} 
                    </NavLink>
                </li>
            )
        })
    }
    render() {

        // изначально, если menu: true
        const cls = [classes.Drawer]

        // если menu: false, Добавляется анимация закрытия
        if (!this.props.isOpen) {
            cls.push(classes.close)
        }

        const links = [
            {to: '/', label: 'Tasks', exact: true},
        ]

        if (this.props.isAuthenticated) {
            links.push({to: '/logout', label: 'Logout', exact: false})
        } else {
            links.push({to: '/auth', label: 'Auth', exact: false})
        }

        return (
            <React.Fragment>
                <nav className={cls.join(' ')}> 
                    <ul>
                        { this.renderLinks(links) }
                    </ul>
                </nav>
                
                {/* эффект фона при menu: true */}
                { this.props.isOpen ? <Backdrop onClick={this.props.onClose}/> : null } 
                
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
      isAuthenticated: !!state.auth.token
    }
  }

export default connect(mapStateToProps)(Drawer)