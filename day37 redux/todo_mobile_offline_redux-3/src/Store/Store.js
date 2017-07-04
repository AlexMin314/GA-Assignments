import { createStore, compose, combineReducers } from 'redux';
import TodoReducer from '../Reducers/Todo';
import SearchReducer from '../Reducers/Search';

export let initStore = () => {

  const reducer = combineReducers( {
      todos: TodoReducer,
      searchTodos: SearchReducer
  });

  const store = createStore( reducer, compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
}
