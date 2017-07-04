import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { toggleTodo } from '../../Actions/Todo';

import './TodoListView.css';

/**
 * TodoListView
 */
export class TodoListView extends Component { // eslint-disable-line react/prefer-stateless-function

    constructor(props){
      super(props);



      this.state = {
        completed: this.props.todo.completed
      }
    }




  onClick = (e) => {

      const toggle = this.state.completed ? false : true;
      console.log('clicked: ', toggle);

      this.props.toggleTodo(this.props.todo.id);

      this.setState( {
        completed: toggle
      });
  }


  render() {

    const done = this.state.completed ? "done" : "notDone";

    return (
      <div className="todo"
           onClick={this.onClick}>
            <div className={done}>
            </div>
            <div className="data">
              <div className="label">{this.props.todo.text}</div>
              <div className="date">2017-07-01 12:12</div>
            </div>
            <div style={{ clear: 'both'}}></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleTodo: (id) => { dispatch(toggleTodo(id)); },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoListView);
