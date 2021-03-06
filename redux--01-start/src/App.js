import React, { Component } from 'react';

import Counter from './containers/Counter/Counter';
import './App.css';

/**
 * Sample App used to demonstrate redux.
 * 
 * After downlaoding zip, must install dependencies:
 *    sudo npm install
 *    sudo npm update react react-dom
 * 
 * Install redux and react redux integration:
 *   sudo npm install --save redux
 *   sudo npm install --save react-redux
 *   sudo npm install --save redux-thunk
 * 
 * Then start the server for dev:
 *    sudo npm start
 */
class App extends Component {
  render() {
    return (
      <div className="App">
       <Counter />
      </div>
    );
  }
}

export default App;
