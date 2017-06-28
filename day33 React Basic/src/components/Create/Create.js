import React, {Component, PropTypes} from 'react';

/**
 * Create
 */
export class Create extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);

    this.state = {
      title: "",
      price: 0,
      id: 0,
      nameEle: "",
      priceEle: ""
    };
  }

  onChange = (e) => {
    let state = this.state;

    if (e.target.name == "name") {
      state.title = e.target.value;
      state.nameEle = e.target;
    }

    if (e.target.name == "price") {
      state.price = e.target.value;
      state.priceEle = e.target;
    }

    this.setState(state);
  }

  onClick = (e) => {

    if (this.state.priceEle !== '' && this.state.nameEle !== '') {
      this.state.priceEle.value = '';
      this.state.nameEle.value = '';

      this.props.createProduct(this.state);

      this.setState({title: "", price: 0, id: 0, nameEle: "", priceEle: ""});
    }
  }

  render() {
    return (
      <section className="row create">
        <div className="col-md-2 name">
          <div className="form-group">
            <input type="text" name="name" placeholder="Name" className="form-control" onChange={this.onChange}/>
          </div>
        </div>
        <div className="col-md-2 price">
          <div className="form-group">
            <input type="number" name="price" min={0} placeholder="Price" className="form-control" onChange={this.onChange}/>
          </div>
        </div>
        <div className="col-md-2 createProduct">
          <button type="button" className="btn btn-success" onClick={this.onClick}>Create</button>
        </div>
        <div className="col-md-2 col-md-offset-4 calc">
          <button type="button" className="btn btn-info">
            Calculate
          </button>
        </div>
      </section>
    );
  }
}

export default Create;
