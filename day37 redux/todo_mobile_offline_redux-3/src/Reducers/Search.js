import {getTodos} from '../API/TodoAPI';
const initialTodos = getTodos();

const searchTodos = (state = initialTodos, action) => {
  switch (action.type) {
    case 'SEARCH_TODO':
      return [...state, action.text]
      break;
  }
}

export default searchTodos;
