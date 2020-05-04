import React, { Component } from 'react';

import Persons from './containers/Persons';

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
 * 
 * Then start the server for dev:
 *    sudo npm start
 */
class App extends Component {
  render() {
    return (
      <div className="App">
        <ol>
          <li>Turn this app into one which does NOT use local state (in components) but instead uses Redux</li>
        </ol>
        <Persons />
      </div>
    );
  }
}

export default App;
