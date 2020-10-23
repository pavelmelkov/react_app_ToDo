import React, {useState} from 'react'
import classes from './Layout.modules.css'
// import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle'
// import Drawer from '../../components/Navigation/Drawer/Drawer'
import Backdrop from '../../components/UI/Backdrop/Backdrop'
import StyleButton from '../../components/UI/StyleButton/StyleButton'

import {connect} from 'react-redux'

import {toggleChange} from '../../store/actions/layout'
import {NavLink} from 'react-router-dom'


const Layout = (props) => {


        const [menu, setMenu] = useState(false)

        const cls = [
            classes.Layout
        ]
        //будет кнопка, меняющая стили через анимацию
        if (props.change) {
            cls.push(classes.White)
        } else {
            cls.push(classes.Black)
        }

        let typeofButton = ''
        if (props.change) {
            typeofButton = 'white'
        } else {
            typeofButton = 'black'
        }
        //___________________________________________________________________
        let styleClass 
        if (props.change) {
            styleClass = classes.MenuToggle
        } else {
            styleClass = classes.MenuToggleBlack
        }
        // изначально это бургер, который расположен слева
        const clsMenu = [
            styleClass,
            'fa',
        ]
        // затем, когда menu: true, то значок - это крестик с классом open, который 
        if (menu) {
            clsMenu.push('fa-times') 
            clsMenu.push(classes.open)
        } else { 
            // когда menu: false, то это бургер с начальными классами
            clsMenu.push('fa-bars')
        }  
        // clickHandler = () => { // функция, которая вызыввает метод, устанавливает  - menu: false
        //     this.props.onClose()
        // }
    
     
       
    
            // изначально, если menu: true
            const clsDrawer = [classes.Drawer]
    
            // если menu: false, Добавляется анимация закрытия
            if (!menu) {
                clsDrawer.push(classes.close)
            }
    
            const links = [
                {to: '/', label: 'Tasks', exact: true},
            ]
    
            if (props.isAuthenticated) {
                links.push({to: '/logout', label: 'Logout', exact: false})
            } else {
                links.push({to: '/auth', label: 'Auth', exact: false})
            }
    
           
           
            
        
        return (
            <div className={cls.join(' ')}>
                <div className={classes.styleButton}>
                    <StyleButton type={typeofButton} onClick = {() => props.toggleChange(!props.change)}>  </StyleButton>
                </div>
                {/* <Drawer 
                    isOpen={menu} 
                    onClose={ () => setMenu(false)}
                    // isAuthenticated = {this.props.isAuthenticated}
                /> */}
                
                {/* <MenuToggle
                    onToggle={() => setMenu(!menu)}
                    isOpen={menu}
                > 
                </MenuToggle>  */}
                <>
                    <nav className={clsDrawer.join(' ')}> 
                        <ul>
                            { links.map( (link, index)=> {
                                return (
                                    <li
                                        key={index}
                                    >
                                        <NavLink  // передаем параметры в навлинк
                                            to={link.to}
                                            exact={link.exact}
                                            activeClassName={classes.active} // стиль активной ссылки
                                            onClick={() => setMenu(false)} // функция, нажатие ихменяет state menu на false
                                        > 
                                            {link.label} 
                                        </NavLink>
                                    </li>
                                    )
                                }
                                ) 
                            }
                        </ul>
                    </nav>
                    
                    {/* эффект фона при menu: true */}
                    { menu ? <Backdrop onClick={() => setMenu(false)}/> : null } 
                    
                </>
                <>
                    <i
                        className={clsMenu.join(' ')}
                        onClick={() => setMenu(!menu)}
                    />
                </>
    
                
                 <main>
                      {props.children}
                      <h5 className={classes.author}> developed by Melkov Pavel </h5>
                 </main>
            </div>
        )
}

function mapStateToProps(state) {
    return  {
        // state, который мы хотим здесь применять
        change: state.layout.change,
         isAuthenticated: !!state.auth.token,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        toggleChange: (toggle) => dispatch(toggleChange(toggle)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)


// class Layout extends React.Component {

//     state = {
//         menu: false,
//     }
    
//     toggleMenuHandler = () => {
//         this.setState({
//             menu: !this.state.menu
//         })
//     }

//     menuCloseHandler = () => {
//         this.setState({
//             menu: false
//         })
//     }

//     changeStyle = () => {
//         const toggle = !this.props.change
//         this.props.toggleChange(toggle)
//     }
//     render() {

//         const cls = [
//             classes.Layout
//         ]
//         // будет кнопка, меняющая стили через анимацию
//         if (this.props.change) {
//             cls.push(classes.White)
//         } else {
//             cls.push(classes.Black)
//         }

//         let typeofButton = ''
//         if (this.props.change) {
//             typeofButton = 'white'
//         } else {
//             typeofButton = 'black'
//         }

//         return (
//             <div className={cls.join(' ')}>
//                 <div className={classes.styleButton}>
//                     <StyleButton type={typeofButton} onClick = {this.changeStyle}>  </StyleButton>
//                 </div>
//                 <Drawer 
//                     isOpen={this.state.menu}
//                     onClose={ this.menuCloseHandler}
//                     // isAuthenticated = {this.props.isAuthenticated}
//                 />
//                 <MenuToggle
//                     onToggle={this.toggleMenuHandler}
//                     isOpen={this.state.menu}
//                 > 
//                 </MenuToggle> 
//                  <main>
//                       {this.props.children}
//                       <h5 className={classes.author}> developed by Melkov Pavel </h5>
//                  </main>
//             </div>
//         )
//     }
// }

// function mapStateToProps(state) {
//     return  {
//         // state, который мы хотим здесь применять
//         change: state.layout.change 
//     }
// }
// function mapDispatchToProps(dispatch) {
//     return {
//         toggleChange: (toggle) => dispatch(toggleChange(toggle)),
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Layout)