import React, { Component, PropTypes } from 'react';

import Create from '../Create/Create';

import './Footer.css';

/**
 * Footer
 */
export class Footer extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <footer className="container-fluid">
        <div className="row">
          <div className="col-xs-12">
            <Create/>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
