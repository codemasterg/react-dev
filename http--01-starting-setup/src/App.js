import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom'

import Blog from './containers/Blog/Blog';

class App extends Component {
  render() {
    return (
      // note basename "/" is default, can be used if say your base is "/my-app"
      <BrowserRouter basename="/">
        <div className="App">
          <Blog />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
