import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Main';
import { Provider } from 'react-redux';
import { createStore,applyMiddleware } from 'redux';

import initState from './store/initstate';
import {lockReducer} from './store/reducer/lockreducer';
import songurl1 from './utils/parseSong';
import logger from 'redux-logger'

initState.collect=songurl1



const store = createStore(lockReducer,initState,applyMiddleware(logger));

ReactDOM.render(
  <Provider store={store}>
  <App />
  </Provider>
    ,document.getElementById('app')

);

