import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from 'react-redux'
import ArticleApp from './ArticleApp'
import * as serviceWorker from './serviceWorker';

import {createStore, applyMiddleware} from 'redux'
import rootReducer from './reducers'

import {fetchArticles} from './actions'

import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger'
const loggerMiddleware = createLogger()


const store = createStore(rootReducer, applyMiddleware(thunk, loggerMiddleware));
store.dispatch(fetchArticles())
.then(()=>{
  console.log(store.getState());
})

ReactDOM.render((
  <Provider store={store}>
    <ArticleApp/>
  </Provider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
