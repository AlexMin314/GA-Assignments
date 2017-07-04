export const setTodos = (Todos) => {

  console.log(Todos);

  if(Array.isArray(Todos)){
    localStorage.setItem('Todos', JSON.stringify(Todos));
  }
}

export const getTodos = () => {
  const todosJSON = localStorage.getItem('Todos');
  let Todos = [];

  try {
    Todos = JSON.parse(todosJSON);
  }catch(e){
    console.log("Error: Cound not decode Todo's from localstorage");
  }

  return Array.isArray(Todos) ? Todos : [];
}
