import React, { Component, PropTypes } from 'react';

import Header from '../Header/Header'
import Search from '../Search/Search'
import TodoList from '../TodoList/TodoList'
import Footer from '../Footer/Footer'


/**
 * Home
 */
export class Home extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <div className="App container-fluid">
          <Header/>
          <Search/>
          <TodoList/>
        </div>
        <Footer/>
      </div>
    );
  }
}


export default Home;
