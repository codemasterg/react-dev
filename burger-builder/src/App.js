import React, { Component } from 'react';
import Layout from './containers/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'

/**
 * Burger Builder App, created with:
 * create-react-app burger-builder --scripts-version 1.1.5
 *   cd burger-builder
 *   npm run eject   // ejected so webpack.config.* can be changed to support scoped CCS classes
 * sudo npm install axios --save  // add support for rest calls from react using axios
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
      
      <Layout>
       {this.state.show ? <BurgerBuilder /> : null}
      </Layout>
    
    );
  }
}

export default App;
