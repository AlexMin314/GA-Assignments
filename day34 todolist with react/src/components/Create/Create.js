import React, {PropTypes} from 'react';
import uuid from 'uuid';

import './Create.css'

export default class Create extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      date: Date().slice(0,-15),
      id: uuid.v4()
    }
  }

  onChange = (e) => {
    const states = this.state;
    states.value = e.target.value;
    this.setState(states);
  }

  onClick = (e) => {
    const states = this.state;

    this.props.createTodos(states);

    states.value = '';
    states.date = Date().slice(0,-15);
    states.id = uuid.v4();
    this.setState(states);
  }

  render() {
    return (
      <div className="input-group todoInput">
        <input id="todoValue"
               placeholder="Add todo..."
               className="form-control"
               value={this.state.value}
               onChange={this.onChange}/>
        <span className="input-group-btn">
          <button id="todoPostBtn"
                  type="button"
                  className="btn btn-default"
                  onClick={this.onClick}>Post</button>
        </span>
      </div>
    );
  }
}
Create.propTypes = {};
