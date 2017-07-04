import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import TodoListView from '../TodoListView/TodoListView'

/**
 * TodoList
 */
export class TodoList extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props){
    super(props)

  }

  render() {

    const { todos } = this.props;

    const renderTodo = () => {

        if(todos.length === 0){
            return (
              <div>Nothing to do. Have a coffee</div>
            )
        }

        return todos.map( (todo) => {
          return (
            <TodoListView todo={todo}/>
          )
        });
    }

    return (
      <section className="row">
        <div className="col-xs-12">
            {renderTodo()}
        </div>
      </section>
    );
  }
}
export default connect(
      (state) => {
        return state;
      }
)(TodoList);
