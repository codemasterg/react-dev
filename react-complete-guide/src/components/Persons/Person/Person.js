/**
 * A Person React component, implemented as a function.
 * 
 * prop-types installed via:
 *    sudo npm install --save prop-types
 * see https://wecodetheweb.com/2015/06/02/why-react-proptypes-are-important/
 */

import React, {useContext} from 'react';
import PropTypes from 'prop-types';
//import './Person.css'
import styled from 'styled-components';  // lib that lets you create HTML style react components
import AuthContext from '../../../context/authContext';

// prefer ES6 syntax since handles 'this' in all cases.
// Here we are making a new HTML tag, <Person> that can be used in App.js
const person = (props) => {

    // will generate console warning if user passes in wrong type or omits
    // a mandatory prop
    person.propTypes= {
        age: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        changed: PropTypes.func.isRequired,
        click: PropTypes.func.isRequired
    }

    // use context like a thread local, set up in App, accessed down here
    // to avoid pass-thru props via Cockpit and Persons
    const authContext = useContext(AuthContext);
    console.log('[Person.js] ' + authContext.someString);

    // you can throw exceptions like in this example which is then caught
    // by the component ErrorBoundary
    if(Math.random() > 0.75) {
       // throw new Error("Simulating random error!");
    }

    return (
        // limited to js function calls, one line expressions, 
        // cannot be new js func defs.  Using StyledDiv with custom dynamic prop 'oldage'
        <StyledDiv oldage={props.age > 50}>
            <p onClick={props.click}>I'm {props.name} and I am {props.age} years old!</p>
            <input type="text" onChange={props.changed} value={props.name}/>
        </StyledDiv>
    );
};

// example of using the styled-components lib, installed in this project's folder:
//   sudo npm install --save styled-components
// notice that class selectors are removed (compare w/ Person.css) and this is actually
// a ref to a React component so you can use it as a tag!  For dynamic styling, like
// any other component, it gets 'props' so you can pass attributes as props to a styled
// component; e.g. 'oldage' is the tag attribute used.
// Alternatively you can define component specific styles in a css module, google
// react css modules that let you have a common module whose scope when applied is to
// the using component.
const StyledDiv = styled.div`
    width: 60%;
    margin: 8px auto;
    border: 1px solid #eee;
    box-shadow: 0 2px 3px #ccc;
    padding: 8px;
    text-align: center;
    color: ${props => props.oldage ? 'red' : 'green'};
    
    /* example of a css media query */
    @media (min-width: 500px) {
        width: 450px;
    }
}
`

export default person;