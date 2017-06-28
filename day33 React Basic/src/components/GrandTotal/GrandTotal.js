import React, { Component, PropTypes } from 'react';

/**
 * GrandTotal
 */
export class GrandTotal extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <section className="row total">
        <h1>Total: <br /> $<span id="grandTotal">{this.props.value}</span></h1>
      </section>
    );
  }
}

export default GrandTotal;
