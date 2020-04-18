import React, { Component } from 'react';
import './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import LifeCycleDemo from '../components/LifeCycleDemo/LifeCycleDemo';
import AuthContext from '../context/authContext';

// initally created with cmd-line: 
//   sudo npm install create-react-app -g
//   mkdir react
//   cd react
//   create-react-app react-complete-guide --scripts-version 1.1.5
class App extends Component {
  // define state as property of App, it's the mutable representation of data,
  // in a real app this would come via REST
  state = {
    persons: [
      {id: 1, name: 'Greg', age: 54},
      {id: 2, name: 'Deb', age: 55},
      {id: 3, name: 'Noah', age: 23}
    ],
    showPersons: false,
    changeCounter: 0
  }

  // setup context for use in Person, MUST be called contextType when set.  Used
  // below, accessed via this.context when used in a class component.  Use a context
  // like a thread local to avoid passing props thru intermediate components and
  // allow low level component to get access to the props set in this context.
  static contextType = AuthContext;

    // example of one of many lifecycle hooks -- this one can be used to make http calls and
    // must not set state before making the call (can do after http call). This method
    // is called on each component update.  Use componentDidMount() if you only need
    // a hook once when this component is inserted into the DOM.
    componentDidUpdate(prevProps, prevState, snapshot) {
      console.log('did mount with context ' + this.context.someString);
    }

  // A React component MUST always render some HTML and it must be in a single 
  // root element! You can also return some json, but nest all "html" (JSX) in a
  // single root element.
  render() {

    let persons = null;

    // this is the prefered way to render conditional content:
    // check a boolean and set a local var to the JSX, then use in
    // the component's return.
    if (this.state.showPersons) {
      persons = (
          <Persons 
            clicked={this.deletePersonHandler}
            changed={this.nameChangedHandler}
            persons={this.state.persons}
          />
      );  
    }

    // this is the "main", it returns content to be rendered including
    // the persons content that was created above.
    return (
      <div className="App">
        <Cockpit
          title={this.props.appTitle}
          showPersons={this.state.showPersons}
          personsLength={this.state.persons.length}
          persons={this.state.persons}
          clicked={this.togglePersonsHandler}
          />
        {persons}
        <LifeCycleDemo mills={ new Date().getMilliseconds()} />
      </div>
    );

  }

  /** HANDLERS */
  // Always use ES6 arrow functions to avoid issue using 'this' op;
  // 'this' should refer to the App component and its props, so using
  // this syntax ensures that.
  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons]  // ES6 spread operator to make a copy
    persons.splice(personIndex, 1);
    // now update state
    this.setState({persons: persons});
  }

  togglePersonsHandler = (event) => {
    const currentShowValue = this.state.showPersons;

    // DON'T do this:  this.state.persons[0].name = 'Gregory';
    // state props are actually merged here.
    this.setState({showPersons: !currentShowValue})

  }

  nameChangedHandler = (event, personId) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === personId;
    });

    const person = {
      ...this.state.persons[personIndex]  // the spread op can also be used for object copies
    }

    // now actually change the name to the event's target value
    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person;
    this.setState( (prevState, props) => {
     return {
            persons: persons,  // updated w/ copy, not by ref -- always best
            // note use of prevState to ensure most recently updated value is actually used
            changeCounter: prevState.changeCounter + 1  
      };  
  
    });
  }

}
// ES6 style export -- make App the thing that gets imported when importing 
// this file.
export default App;
