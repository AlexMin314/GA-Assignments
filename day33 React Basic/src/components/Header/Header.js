import React, { Component } from 'react';
import PropTypes from 'prop-types';


import './Header.css';

/**
 * Header
 */
export class Header extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <header>
            <h1>{this.props.title}</h1>
          </header>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string
}

export default Header;
