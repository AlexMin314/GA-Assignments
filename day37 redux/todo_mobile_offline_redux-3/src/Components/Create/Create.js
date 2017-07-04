import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { addTodo } from '../../Actions/Todo';


import './Create.css';

/**
 * Create
 */
export class Create extends Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props){
    super(props)

    this.state = {
      text: ""
    }
  }

  onChange = (e) => {
    let text = e.target.value;
    this.setState({text})
  }

  onClick = (e) => {
    this.props.createTodo(this.state.text);
    this.setState({
      text: ''
    });
  }

  render() {
    return (
      <div className="create">
        <input className="form-control input-lg"
               type="text"
               placeholder="Enter todo"
               value={this.state.text}
               onChange={this.onChange}/>
        <button type="button"
                className="btn btn-primary btn-lg"
                onClick={this.onClick}>
                Create
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        todos: state.todos
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createTodo: (text) => { dispatch(addTodo(text)); },
  }  
}

export default connect(mapStateToProps, mapDispatchToProps)(Create);
