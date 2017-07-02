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
      searchList: [],
      renderList: []
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

    states.todoList = states.todoList.filter((e) => {
      return e.id !== todoId;
    });

    states.searchList = states.searchList.filter((e) => {
      return e.props.id != todoId;
    });

    this.setState(states);
  }

  searchTodos = (search) => {
    const states = this.state;
    if (search) {
      states.searchList = [];
      const searchStr = new RegExp(search);

      this.state.renderList.forEach((e, i) => {
        if (searchStr.test(e.props.value)) {
          states.searchList.push(e);
        }
      });
    }
    this.setState(states);
  }


  drawTodos = () => {
    if (this.state.searchList.length === 0) {

        this.state.todoList.forEach((e) => {
          this.state.renderList.push(<Todos id={e.id}
                                  value={e.value}
                                  date={e.date}
                                  deleteTodos={this.deleteTodos}
                                  key={e.id}/>);
        });
    }

    return this.state.searchList.length > 0
              ? this.state.searchList
              : this.state.renderList.reverse();
  }

  render() {

    const todos = this.drawTodos();

    return (
      <div>
        <Create createTodos={this.createTodos}/>
        <Search drawTodos={this.searchTodos}/>
        <div id="todoList">
          {todos}
        </div>
      </div>
    );
  }
}

List.propTypes = {};
