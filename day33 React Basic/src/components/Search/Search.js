import React, {PropTypes} from 'react';
import './Search.css'

export default class Search extends React.Component {
  constructor(props) {
    super(props);


  }

  onKeyUp = (e) => {
    this.props.drawTodos(e.target.value)
  }


  render() {
    return (
      <div className="form-group has-feedback">
        <input name="searchBar"
               className="searchBar form-control"
               placeholder="Search"
               autoFocus
               onKeyUp={this.onKeyUp}/>
        <i className="glyphicon glyphicon-search form-control-feedback" />
      </div>
    );
  }
}

Search.propTypes = {};
