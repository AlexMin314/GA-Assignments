import React, { Component} from 'react';

import ProductRow from '../ProductRow/ProductRow';
import Create from '../Create/Create';
import GrandTotal from '../GrandTotal/GrandTotal';
import uuidv4 from 'uuid/v4';
/**
 * Cart
 */
export class Cart extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props){
    super(props);

    this.state = {
      grandTotal: 0,
      products: []
    }
  }

  updateGrandTotal = (subTotal) => {
    const grandTotal = this.state.grandTotal + subTotal;
    this.setState({
      grandTotal: grandTotal
    });
  }

  createProduct = (product) => {

    let newProduct = {};
    newProduct.title = product.title;
    newProduct.price = product.price;
    newProduct.id = uuidv4();

    let products = this.state.products;
    products.push(newProduct);

    this.setState({
      products: products
    });

  }

  deleteProduct = (targetId, info) => {
    let productList = this.state.products;

    productList = this.state.products.filter((e) => {
      return e.id !== targetId;
    });

    const newGrandTotal = this.state.grandTotal - info.subtotal;

    this.setState({
      products: productList,
      grandTotal: newGrandTotal
    });
  }


  createProductRows = () => {

    var productRows = [];

    this.state.products.forEach((product, index) => {
      productRows.push(<ProductRow id={product.id} title={product.title} price={product.price} grandtotal={this.updateGrandTotal} deleteProduct={this.deleteProduct}/>)
    });

  return productRows;
  }

//deleteProduct={this.deleteProduct}


  render() {

    const rows = this.createProductRows();

    return (
      <div className="row" id="cart">
        <div className="col-md-12 productRows">
          {rows}
        </div>
        <div className="col-md-12">
          <Create createProduct={this.createProduct}/>
        </div>
        <div className="col-md-12">
          <GrandTotal value={this.state.grandTotal}/>
        </div>
      </div>
    );
  }
}
export default Cart;
