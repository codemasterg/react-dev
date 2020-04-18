import React, { Component } from 'react';
import './App.css';
import ValidationComponent from './ValidationComponent/ValidationComponent'
import CharComponent from './CharComponent/CharComponent'

// initally created with cmd-line: 
//   sudo npm install create-react-app -g
//   mkdir react
//   cd react
//   create-react-app lists-practice --scripts-version 1.1.5

class App extends Component {

  // define state as property of App, it's the mutable representation of data
  state = {
    userinput: '',
    textLength: 0
  }

  render() {

    // best practice is to wrap JS logic and the react comonent being used
    // in a const, then use it in the App's return (below this definition)
    const renderChars = (
      this.state.userinput.split('').map( (eachChar, index) => {
        return (
          <CharComponent 
            // anonymous func needed so that the handler method is not called at load time
            remover={() => {this.deleteCharClickHandler(index)}}   
            key={index} 
            charEntered={eachChar} />
        );
      }
    ))

  // A React component MUST always render some HTML and it must be in a single 
  // root element! You can also return some json, but nest all "html" (JSX) in a
  // single root element.
    return (
      <div className="App">
        <h2>Lists and Conditionals React Practice App</h2>
        <input type="text"
          onChange={this.textChangeHandler} 
          value={this.state.userinput}>
        </input>
        <p>Length: {this.state.userinput.length}</p>
        <ValidationComponent textLength={this.state.userinput.length} />
        {renderChars}
      </div>
    );
  }

  // Always use ES6 arrow functions to avoid issue using 'this' op;
  // 'this' should refer to the App component and its props, so using
  // this syntax ensures that.
  textChangeHandler = (event) => {
    this.setState(
      {
        userinput: event.target.value
      }

    )
  }

  /**
   * Delete char from user input at the given index and set state with the 
   * updated string.
   */
  deleteCharClickHandler = (index) => {
    const userInput = this.state.userinput;

    const updatedInput = userInput.substring(0, index) + userInput.substring(index + 1);
    console.log("upadated string is " + updatedInput);
    this.setState(
      {
        userinput: updatedInput
      }
    )
  }
}
// ES6 style export -- make App the thing that gets imported when importing 
// this file.
export default App;