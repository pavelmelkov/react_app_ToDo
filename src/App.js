import React, {Component} from 'react';
import './App.css'

import { Route, Switch, Redirect } from 'react-router-dom'

import TaskOne from './components/TaskOne/TaskOne'
import TaskList from '../src/containers/TaskList/TaskList'
import Auth from '../src/containers/Auth/Auth'

import Layout from './HOC/Layout/Layout'
import Logout from './components/Logout/Logout'

import {connect} from 'react-redux'
import {autoLogin} from './store/actions/auth'
 
class App extends Component {

  componentDidMount() {
    this.props.autoLogin()
  }

  render() {
    // let routes = (
    //  <>
    //     <Route path='/auth'> {this.props.isAuthenticated ? <Redirect to="/" /> : <Auth/>} </Route>
    //     <Route path='/tasks/:id' > {!this.props.isAuthenticated ? <Redirect to="/" /> : <TaskOne />} </Route>
    //     <Route path='/' exact component={TaskList} />
    //     {/* <Redirect to="/auth" /> */}
    //  </>
    // )  

    // if (this.props.isAuthenticated) {
    //   routes = (
    //    <>
    //       <Route path='/logout'> {!this.props.isAuthenticated ? <Redirect to="/" /> : <Logout/>}</Route>
    //       <Route path='/tasks/:id'> {!this.props.isAuthenticated ? <Redirect to="/" /> : <TaskOne/>} </Route>
    //       <Route path='/' exact component={TaskList} />
          
    //    </>
    //   )  
    // }
    
    return (
     <>
      {
        !this.props.isAuthenticated ? 
        <>
          {/* <Layout>
            <Switch>
                <Route path='/auth' component={Auth} /> 
                <Route path='/' exact component={TaskList} />
                <Redirect to='/auth'/>
            </Switch>
          </Layout> */}

          <Switch>
            <Layout>
                <Route path='/auth' component={Auth} /> 
                <Route path='/' exact component={TaskList} />
                <Redirect to='/auth'/>
            </Layout>
          </Switch>
                
            
        </>
        : 
        <>
          {/* <Layout>
            <Switch> 
                <Route path='/tasks/:id' component={TaskOne} /> 
                <Route path='/logout' component={Logout}/>
                <Route path='/' exact component={TaskList} /> 
                <Redirect to='/'/>
            </Switch>
          </Layout> */}
          <Switch>
            <Layout>
                <Route path='/tasks/:id' component={TaskOne} /> 
                <Route path='/logout' component={Logout}/>
                <Route path='/' exact component={TaskList} /> 
                <Redirect to='/'/>
            </Layout>
           </Switch>
        </>
      }
       

      </>
    )
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token
  }
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

