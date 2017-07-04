import uuid from 'uuid'

export const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    id: uuid.v4(),
    text
  }
}

export const addTodos =(todos) => {
  return {
    type: "ADD_TODOS",
    todos
  }
}

export const toggleTodo =(id) => {
  return {
    type: "TOGGLE_TODO",
    id
  }
}

export const searchTodo =(text) => {
  return {
    type: "SEARCH_TODO",
    text
  }
}
