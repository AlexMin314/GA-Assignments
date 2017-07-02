import React, {PropTypes} from 'react';

import './Todos.css';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Todos extends React.Component {
  constructor(props) {
    super(props);

  }

  onDelete = () => {
    this.props.deleteTodos(this.props.id);
  }

  render() {
    return (
      <div>
        <ReactCSSTransitionGroup transitionName = "todoAni"
                                 transitionAppear = {true}
                                 transitionAppearTimeout = {500}>
          <div className="wrapper"
               id={this.props.id}>
            <i className="glyphicon glyphicon-ok delete"
               id="chkBtn"
               onClick={this.onDelete}/>
            <div className='value'>{this.props.value}</div>
            <div className='date'>{this.props.date}</div>
          </div>
         </ReactCSSTransitionGroup>
      </div>
    );
  }
}

Todos.propTypes = {};
