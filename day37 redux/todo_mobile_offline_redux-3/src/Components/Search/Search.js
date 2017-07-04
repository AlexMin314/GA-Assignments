import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { searchTodo } from '../../Actions/Todo';
/**
 * Search

 */
export class Search extends Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props)

    this.state = {
      search: ''
    }
  }

  onChange = (e) => {
    this.props.searchTodo(e.target.value);
  }

  render() {
    return (
      <section className="row">
        <div className="col-xs-12">
          <input className="form-control input-lg"
                 type="text"
                 placeholder="Search"
                 onChange={this.onChange} />
        </div>
      </section>
    );
  }
}


const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchTodo: (id) => { dispatch(searchTodo(id)); },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
