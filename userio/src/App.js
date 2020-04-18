import React, { Component } from 'react';
import './App.css';
import UserInput from './UserInputOutput/UserInput';
import UserOutput from './UserInputOutput/UserOutput';

// initally created with cmd-line: 
//   sudo npm install create-react-app -g
//   mkdir react
//   cd react
//   create-react-app userio --scripts-version 1.1.5

class App extends Component {

  // define state as property of App, it's the mutable representation of data
  state = {
    username: 'codemasterg'
  }

  // A React component MUST always render some HTML and it must be in a single 
  // root element! You can also return some json, but nest all "html" (JSX) in a
  // single root element.
  render() {


    return (
      <div className="App">
        <h2>Hi, I'm a React App</h2>
        <p>working.</p>

        <UserInput
          changed={this.userNameChangeInputHandler} 
          currentName={this.state.username}>
        </UserInput>
        <UserOutput username={this.state.username}></UserOutput>
        <UserOutput username={this.state.username}></UserOutput>
      </div>
    );
  }

  // Always use ES6 arrow functions to avoid issue using 'this' op;
  // 'this' should refer to the App component and its props, so using
  // this syntax ensures that.
  userNameChangeInputHandler = (event) => {
    this.setState(
      {username: event.target.value}
    )
  }
}
// ES6 style export -- make App the thing that gets imported when importing 
// this file.
export default App;