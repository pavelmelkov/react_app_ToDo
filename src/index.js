import React from 'react';
import {render} from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// для redux
import {Provider} from 'react-redux'
import {createStore, compose, applyMiddleware } from 'redux'
import rootReducer from './store/reducers/rootReducer'

import thunk from 'redux-thunk'
import {BrowserRouter} from 'react-router-dom'

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose; 


const store =  createStore( // наш стор
  rootReducer, //
  composeEnhancers( //
    applyMiddleware(thunk) //
  )
)


render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <>
          <App />
        </>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
