
/**
 * Sample app used to introduce redux.  
 * To install redux:
 *   sudo npm install --save redux
 * To execute:
 *    cd to src where this file resides
 *    node redux-standalone.js
 */

const redux = require('redux')
const createStore = redux.createStore;
const initialState = {
    counter: 0,
}


// Reducer. Note use of default arg value, used when state is undefined as in initial call.
const rootReducer = (state = initialState, action) => {

    if(action.type === 'INC_COUNTER') {

        // Must NEVER mutate state directly; i.e. state.counter++.  Must
        // use spread op on each object in state then change on copy.  In this
        // example, since count is a primitive can access it after spread and inc 1
        // to set copied value.
        return{
            ...state,
            counter: state.counter+ 1,
        }
    }

    if(action.type === 'ADD_COUNTER') {
        return{
            ...state,
            counter: state.counter+ action.value,
        }
    }

    // must return a state
    return state;  // no-op if none of the above are true
}

// Store
const store = createStore(rootReducer);
console.log(store.getState());


// Subscription
store.subscribe(() => {
    console.log('[Subscription]', store.getState());
})


// Dispatching an action.  The JS object must use field name 'type'.  The
// naming convention is all upper case for the action.  Dispatch 2 actions
// in this example.
store.dispatch({type: 'INC_COUNTER'});
store.dispatch({type: 'ADD_COUNTER', value: 10});
console.log(store.getState());
