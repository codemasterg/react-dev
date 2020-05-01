import React, { Component } from 'react';

import Counter from './containers/Counter/Counter';
import './App.css';

/**
 * Sample App used to demonstrate redux.
 * 
 * After downlaoding zip, must install dependencies:
 *    sudo npm install
 * 
 * Install redux and react redux integration:
 *   sudo npm install --save redux
 *   sudo npm install --save react-redux
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
