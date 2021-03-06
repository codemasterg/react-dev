import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import Layout from './containers/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'

/**
 * Burger Builder App, created with:
 * create-react-app burger-builder --scripts-version 1.1.5
 *   cd burger-builder
 *   npm run eject   // ejected so webpack.config.* can be changed to support scoped CCS classes
 * sudo npm install axios --save  // add support for rest calls from react using axios
 * sudo npm install --save react-router react-router-dom // add support for path routing
 * 
 * Install redux and react redux integration:
 *   sudo npm install --save redux
 *   sudo npm install --save react-redux
 *   sudo npm install --save redux-thunk
 * 
 * Component flow: BurgerBuilder --> OrderSummary (a dialog / modal) --> Checkout
 *    --> CheckoutSummary
 */
class App extends Component {

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
          {/* Use 'exact' so "/" is not treated as a wild card prefix, A Switch can instead be used
          if preferred */}
          <Route path="/auth" component={Auth}/>
          <Route path="/checkout" component={Checkout}/>
          <Route path="/orders" component={Orders}/>
          <Route path="/" exact component={BurgerBuilder}/>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
