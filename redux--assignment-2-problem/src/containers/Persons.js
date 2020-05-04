import React, { Component } from 'react';
import {connect} from 'react-redux'


import Person from '../components/Person/Person';
import AddPerson from '../components/AddPerson/AddPerson';
import * as actionType from '../store/actionType'

class Persons extends Component {
    state = {
        persons: []
    }

    // add person click handler that receives person info, then
    // dispatches the add person action to any interested reducers;
    // i.e. personReducer.js
    personAddedHandler = (name, age) => {
        const newPerson = {
            id: Math.random(), // not really unique but good enough here!
            name: name,
            age: age,
        }
        // this.setState( ( prevState ) => {
        //     return { persons: prevState.persons.concat(newPerson)}
        // } );
        this.props.onAddPerson(newPerson);
        
    }

    render () {
        return (
            <div>
                <AddPerson personAdded={this.personAddedHandler} />
                {this.props.persons.map(person => (
                    <Person 
                        key={person.id}
                        name={person.name} 
                        age={person.age} 
                        clicked={() => this.props.onRemovePerson(person.id)}/>
                ))}
            </div>
        );
    }
}

// subset of state to pass to connect that this component is interested in.  In this
// example, prop "persons" is mapped to state "persons" which was established in personReducer.js.
// 'persons'' will be passed as normal props to Persons via connect().  "perReducer" 
// is the prop name defined in index.js where the separate reducers are combined.
const mapStateToProps = (state) => {
    return{
       persons: state.perReducer.persons
    }
}

/**
 * Establish a method property, 'onAddPerson' in this case that maps to
 * action of type 'ADD_PERSON'.  'onPersonAdd' can be used in the above component
 * and will be passed as normal props to this Persons component via connect().
 * 
 * @param {*} dispatch reference to the redux dispatcher that is used to publish an 
 * event (action) 
 */
const mapDispatchToProps = (dispatch) => {
    return {
        onAddPerson: (person) => {
            // MUST be use 'type' as the name
            return dispatch({type: actionType.ADD_PERSON, person: person});
        },
        onRemovePerson: (personId) => {
            return dispatch({type: actionType.REMOVE_PERSON, id: personId});
        },
    }
}

// connect is a react redux function that retunrs a function which in turn takes
// a component as a param.  not very obvious, but this is the syntax!
export default connect(mapStateToProps, mapDispatchToProps)(Persons);