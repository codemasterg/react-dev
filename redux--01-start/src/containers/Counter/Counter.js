import React, { Component } from 'react';
import {connect} from 'react-redux'

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

class Counter extends Component {
    state = {
        counter: 0
    }

    counterChangedHandler = ( action, value ) => {
        switch ( action ) {
            case 'inc':
                this.setState( ( prevState ) => { return { counter: prevState.counter + 1 } } )
                break;
            case 'dec':
                this.setState( ( prevState ) => { return { counter: prevState.counter - 1 } } )
                break;
            case 'add':
                this.setState( ( prevState ) => { return { counter: prevState.counter + value } } )
                break;
            case 'sub':
                this.setState( ( prevState ) => { return { counter: prevState.counter - value } } )
                break;
        }
    }

    render () {
        return (
            <div>
                {/* Note use of "ctr" prop, which was established below in mapping
                of state to props given to redux connect(). */}
                <CounterOutput value={this.props.ctr} />
                {/* Instead of the normal handler ref, pass redux method property established
                    at the bottom of this file that fires an action event. */}
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
                <CounterControl label="Add 5" clicked={this.props.onAddCounter}  />
                <CounterControl label="Subtract 5" clicked={this.props.onSubtractCounter}  />
                <hr />
                <button onClick={this.props.onStoreResult}>Store Result</button>
                <ul>
                    {this.props.storedResults.map(result => {
                        return (<li
                            key={result.id}
                            onClick={() => this.props.onDeleteResult(result.id)}>
                            {result.value}
                            </li>);
                    })}
                    
                </ul>
            </div>
        );
    }
}

// subset of state to pass to connect that this component is interested in.  In this
// example, prop "ctr" is mapped to state "counter" which was established in reducer.js.
// ctr will be passed as normal props to Counter via connect().
const mapStateToProps = (state) => {
    return{
       ctr: state.counter,
       storedResults: state.results
    }
}

/**
 * Establish a method property, 'onIncrementCounter' in this case that maps to
 * action of type 'INCREMENT'.  onIncrementCounter can be used in the above component
 * and will be passed as normal props to Counter via connect().
 * 
 * @param {*} dispatch reference to the redux dispatcher that is used to publish an 
 * event (action) 
 */
const mapDispatchToProps = (dispatch) => {
    return {
        onIncrementCounter: () => {
            // MUST be use 'type' as the name
            return dispatch({type: 'INCREMENT'});
        },
        onDecrementCounter: () => {
            return dispatch({type: 'DECREMENT'});
        },
        onAddCounter: () => {
            return dispatch({
                type: 'ADD',
                // You can pass any payload, convention is usually an object 
                //    payload: {f1:v1, f2:v2,..}
                // Since we are dealing with a count, simple value (named 'value') 
                // is passed in this example.
                value: 5
            });
        },
        onSubtractCounter: () => {
            return dispatch({
                type: 'SUBTRACT',
                value: 5
            });
        },
        onStoreResult: () => {
            return dispatch({type: 'STORE_RESULT'});
        },
        onDeleteResult: (listElementId) => {
            // resId used by reducer for this action to know which result in the array to delete
            return dispatch({type: 'DELETE_RESULT', resId: listElementId});
        },
    }
}

// connect is a react redux function that retunrs a function which in turn takes
// a component as a param.  not very obvious, but this is the syntax!
export default connect(mapStateToProps, mapDispatchToProps)(Counter);