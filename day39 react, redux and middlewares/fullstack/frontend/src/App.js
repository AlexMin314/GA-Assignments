import React, { Component } from 'react';
import axios from 'axios';

import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
        manufacturer: ""
    }


  }

  componentDidMount() {

    axios.get('/api/')
      .then( (response) => {
        console.log(response);
        this.setState({
          manufacturer: response.data[1].manufacturer
        });
      })
      .catch((error)=> {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to {this.state.manufacturer}</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
