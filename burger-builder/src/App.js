import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom'
import Layout from './containers/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'

/**
 * Burger Builder App, created with:
 * create-react-app burger-builder --scripts-version 1.1.5
 *   cd burger-builder
 *   npm run eject   // ejected so webpack.config.* can be changed to support scoped CCS classes
 * sudo npm install axios --save  // add support for rest calls from react using axios
 * sudo npm install --save react-router react-router-dom // add support for path routing
 */
class App extends Component {

  state = {
    show: true,
  }

  // for testing cleanup
  componentDidMount() {
    // setTimeout(() => {
    //   this.setState({show: false})
    // }, 5000)
  }
  render() {
    return (
      // Setup BrowserRouter here so all descedant components can use routing 
      <BrowserRouter>
        <Layout>
          {this.state.show ? <BurgerBuilder /> : null}
          <Checkout />
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
