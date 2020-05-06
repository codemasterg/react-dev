/**
Action types used for redux action dispatch and processing in the reducer. 
Note that these can be in own JS file, say actionTypes.js while the actions
creators can be put in their own related JS files, say counter.js and result.js.
Finally you can the make an index.js that uses ES6 export to export all the creators:
export {} from './counter.js

export {
    add,
    subtract, 
    increment, 
    decrement
} from './counter';

 */

export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const ADD = 'ADD';
export const SUBTRACT = 'SUBTRACT';
export const STORE_RESULT = 'STORE_RESULT';
export const DELETE_RESULT = 'DELETE_RESULT';

// action creators serve as wrapper functions for the above, they are also
// needed for async ops in redux thunk
export const increment = () => {
    return {
        type: INCREMENT
    }
}

export const decrement = () => {
    return {
        type: DECREMENT
    }
}

export const add = (value) => {
    return {
        type: ADD,
        value: value
    }
}

export const subtract = (value) => {
    return {
        type: SUBTRACT,
        value: value
    }
}

const saveResult = (result) => {
    return {
        type: STORE_RESULT,
        result: result
    }
}

// example of async operation with redux thunk, return a function for thunk
// to execute async.  will not block UI but since it's integrated as middleware
// will be run by thunk on our behalf.
export const storeResult = (result) => {

    // thunk will pass both functions, but you should avoid doing much with state in
    // an action function because they are intended to support thunk async.
    return (dispatch, getState) => {
        const oldCounter = getState().ctrReducer.counter;  // 'counter' as named in counterReducer.js
        console.log(oldCounter)
        setTimeout(() => {
            dispatch(saveResult(result));
        }, 5000);
    }

}

export const deleteResult = (resultId) => {
    return {
        type: DELETE_RESULT,
        resId: resultId
    }
}