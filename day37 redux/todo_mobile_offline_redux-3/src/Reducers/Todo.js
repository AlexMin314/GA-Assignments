import {getTodos} from '../API/TodoAPI';
const initialTodos = getTodos();

const todos = (state = initialTodos, action) => {

  console.log(action);

  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state, {
          id: action.id,
          text: action.text,
          completed: false
        }
      ]
      break;

    case 'TOGGLE_TODO':
      return state.map((todo) => {
        if (action.id == todo.id) {
          todo.completed = todo.completed
            ? false
            : true;
        }
        return todo;
      });
      break;

    default:
      return state
  }
}

export default todos;
