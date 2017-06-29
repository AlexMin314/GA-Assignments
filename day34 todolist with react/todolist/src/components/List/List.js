import React, {PropTypes} from 'react';

import Todos from '../Todos/Todos';
import Create from '../Create/Create';
import Search from '../Search/Search';

import './List.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todoList: [],
      deleteInfo: []
    }
  }

  createTodos = (todoInfo) => {
    const newTodo = {};
    newTodo.value = todoInfo.value;
    newTodo.date = todoInfo.date;
    newTodo.id = todoInfo.id;

    const states = this.state;
    states.todoList.push(newTodo);

    this.setState(states);
  }

  deleteTodos = (todoId) => {
    const states = this.state;

    states.deleteInfo = states.todoList.filter((e) => {
      return e.id === todoId;
    });

    states.todoList = states.todoList.filter((e) => {
      return e.id !== todoId;
    });

    this.setState(states);
  }

  drawTodos = () => {
    const todoListArr = [];

    this.state.todoList.forEach((e) => {
      todoListArr.push(<Todos id={e.id}
                              value={e.value}
                              date={e.date}
                              deleteTodos={this.deleteTodos}
                              key={e.id}/>);
    });
    return todoListArr.reverse();
  }

  // fadeOut = () => {
  //   console.log('here!');
  //   const fadeOutArr = [];
  //
    // this.state.deleteInfo.forEach((e) => {
    //   fadeOutArr.push(<Todos id={e.id}
    //                           value={e.value}
    //                           date={e.date}
    //                           deleteTodos={this.deleteTodos}
    //                           key={e.id}/>);
    // });
  //
  //   return fadeOutArr;
  // }

  render() {

    //const fadeOutTodo = this.fadeOut();
    const todos = this.drawTodos();
    console.log(this.state.deleteInfo);

    return (
      <div>
        <Create createTodos={this.createTodos}/>
        <Search/>
        <div id="todoList">
          {todos}
        </div>
      </div>
    );
  }
}

List.propTypes = {};
