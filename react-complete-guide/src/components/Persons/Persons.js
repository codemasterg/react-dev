import React from 'react';

import Person from './Person/Person';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'

// Map props to Person component attributes.  Note double arrow syntax on the
// line below, it can be used when function body of 1st arrow function 
// is immediately another arrow function.  This eliminates the need for an outer
// return statement.
const persons = (props) => props.persons.map( (person, index) => {
        
    // "key" is needed by React for collections,
    // must be unique but do not use index since it recalculated.
    // use a value that does not change for an existing element.
    // Notice it was moved to ErrorBoundary because key must be on outermost element
    return( 
        <ErrorBoundary key={person.id}>
        <Person 
            click={() => props.clicked(index)} 
            changed={(event) => props.changed(event, person.id)}
            name={person.name} 
            age={person.age}
            
            /> 
        </ErrorBoundary>
    );
});

export default persons;