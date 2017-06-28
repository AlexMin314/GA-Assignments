import React, { Component, PropTypes } from 'react';

/**
 * ProductRow
 */
export class ProductRow extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props){
    super(props);
    this.state = {
      subtotal: 0,
      qty: 0
    }
  }

  onChange = (e) => {
    const qty = e.target.value;
    const subTotalDiff = this.props.price * (qty - this.state.qty);

    this.props.grandtotal(subTotalDiff);

    this.setState({
      subtotal: this.props.price * qty,
      qty: qty
    });
  }

  onDelete = (e) => {
    let target = e.target;
    while (!target.id) target = target.parentNode;
    this.props.deleteProduct(target.id, this.state);
  }

  render() {
    return (
      <div className="row product" id={this.props.id}>
        <div className="col-md-3 title">
          {this.props.title}
        </div>
        <div className="col-md-3 price">
          ${this.props.price}
        </div>
        <div className="col-md-3 qtr">
          <input type="number"
                 name="quantity"
                 min={0}
                 max={50}
                 defaultValue={0}
                 onChange={this.onChange}/>
        </div>
        <div className="col-md-1 subtotal">
          ${this.state.subtotal}
        </div>
        <div className="col-md-2 delete">
          <button type="button"
                  className="btn btn-danger"
                  onClick={this.onDelete}>
                  Delete
          </button>
        </div>
      </div>
    );
  }
}


export default ProductRow;
