import registerServiceWorker from './registerServiceWorker';

import React from 'react';
import ReactDOM from 'react-dom';

// Redux
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import TodoReducer from './Reducers/Todo'
import App from './Components/App/App';
import { initStore } from './Store/Store'

// API
import { setTodos, getTodos } from './API/TodoAPI';
import { addTodo, addTodos } from './Actions/Todo';

import './index.css';

const store = initStore();
store.subscribe( () => {
    const state = store.getState();
    console.log
    setTodos(state.todos);
})

const initialTodos = getTodos();
store.dispatch(addTodos(initialTodos));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
