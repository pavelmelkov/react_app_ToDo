import React, {Component} from 'react'
import classes from './Auth.modules.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import {auth} from '../../store/actions/auth'
import { connect } from 'react-redux'

function validateEmail(email) { // функция для валидации почты
    const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

class Auth extends Component {
    state = {
        isFormValid: false,
        formControl: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Введите корректный email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Пароль',
                errorMessage: 'Введите корректный пароль',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    }

    loginHandler = () => {
        this.props.auth(
            this.state.formControl.email.value,
            this.state.formControl.password.value,
            true
        )
    }

    registerHandler = () => {
        this.props.auth(
            this.state.formControl.email.value,
            this.state.formControl.password.value,
            false
        )
    }

    submitHandler = event => {
        event.preventDefault()
    }
    
    validateControl(value, validation) {
        if (!validation) {
            return true
        }

        let isValid = true
        
        if (validation.required) {
            isValid = value.trim() !== '' && isValid 
        }

        if (validation.email) {
            isValid = validateEmail(value) && isValid
        }

        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }
        if (value === '') {
            isValid = true
        }
        return isValid
    }

    onChangeHandler = (event, controlName) => {
       
        const formControl = { ...this.state.formControl }
        const control = { ...formControl[controlName] }

        control.value = event.target.value
        control.touched = true

        control.valid = this.validateControl(control.value, control.validation)
        formControl[controlName] = control
        let isFormValid = true

        Object.keys(formControl).forEach(name => {
            isFormValid = formControl[name].valid && isFormValid
        })
        this.setState({
            formControl, isFormValid
        })
    }

    renderInputs() {
        return Object.keys(this.state.formControl).map((controlName, index) => {
            const control = this.state.formControl[controlName]
            return (
            <Input 
                key={controlName + index}
                type={control.type}
                value={control.value}
                valid={ control.valid }
                touched = { control.touched }
                label={ control.label }
                errorMessage={ control.errorMessage }
                shouldValidate = { !!control.validation }
                onChange={ (event) => this.onChangeHandler(event, controlName) }
            />
            )
        })
    }

    render(){
        const clsAuth = []
        if (this.props.change) {
            clsAuth.push(classes.Auth)
        } else {
            clsAuth.push(classes.AuthBlack)
        }
        return (
        <div className={clsAuth.join(' ')}>
            <div>
                <h1> Авторизация </h1>

                <form onSubmit={this.submitHandler} className={classes.AuthForm}>
                    <div className={classes.divInput}>
                       {this.renderInputs()}
                    </div>


                <div className={classes.divButton}>
                    <Button 
                    id='auth'
                    type="success" 
                    onClick={this.loginHandler}
                    disabled={!this.state.isFormValid}>
                        Войти</Button>
                    <Button  
                    id='auth'
                    type="primary" 
                    onClick={this.registerHandler}
                    disabled={!this.state.isFormValid}>
                        Регистрация</Button>
                </div>

                </form> 

            </div>
        </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        change: state.layout.change
    }
}
function mapDispatchToProps(dispatch) {
    return {
        auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)

