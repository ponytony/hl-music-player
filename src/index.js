import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Main';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import playerReducer from './redux/reducer/reducerindex';

// Render the main component into the dom

const store = createStore(playerReducer);

ReactDOM.render(
  <Provider store={store}>
  <App />, document.getElementById('app')
  </Provider>
);

