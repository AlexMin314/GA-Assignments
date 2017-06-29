import React, {PropTypes} from 'react';
import './Search.css'

export default class Search extends React.Component {
  constructor(props) {
    super(props);


  }

  onKeyPress = (e) => {
    console.log('serch works!');
  }


  render() {
    return (
      <div className="form-group has-feedback">
        <input name="searchBar"
               className="searchBar form-control"
               placeholder="Search"
               autoFocus
               onKeyPress={this.onKeyPress}/>
        <i className="glyphicon glyphicon-search form-control-feedback" />
      </div>
    );
  }
}

Search.propTypes = {};
