import React, {Component} from 'react';

import { Route, Switch } from 'react-router-dom'

import TaskList from '../src/containers/TaskList/TaskList'
import Task from '../src/containers/Task/Task'
import Auth from '../src/containers/Auth/Auth'

import Layout from './HOC/Layout/Layout'

class App extends Component {

  render() {
   let routes = (
      <Switch> 
        <Route path='/auth' component={Auth} />
        <Route path='/tasks/:id' component={Task} />
        <Route path='/' exact component={TaskList} />
      </Switch>
    )  
     
    return (
     <Layout>
        {routes}
      </Layout>
    )
  }
}

export default App;
