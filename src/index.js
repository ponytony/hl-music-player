import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Main';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import initState from './store/initstate'
import {lockReducer} from './store/reducer/lockreducer';

import songurl1 from './utils/parseSong'
initState.collect=songurl1
// Render the main component into the dom

const store = createStore(lockReducer,initState);

ReactDOM.render(
  <Provider store={store}>
  <App />
  </Provider>
    ,document.getElementById('app')

);

