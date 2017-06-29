import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import List from '../List/List';


class App extends Component {
  render() {
    return (
      <div className="App">
        <div id="bg"></div>
        <List/>
      </div>
    );
  }
}

export default App;
