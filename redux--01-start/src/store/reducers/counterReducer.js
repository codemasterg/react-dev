import * as actionType from '../actions/actions'

import {updateObject} from '../utility'

const initialState = {
    counter: 0,
}

/**
 * It's critical that a true copy of state be made before updates are made.
 * Nested objects and arrays require special care, see:
 *    https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns/
 * 
 * @param {*} state 
 * @param {*} action 
 */
// if state is undefined, use default param value 'initialState'
const reducer = (state = initialState, action) => {

    switch (action.type) {
        case (actionType.INCREMENT):
            return {
                ...state,   // use spread op to make a shallow copy, every level of nesting must be copied
                counter: state.counter + 1
            }
        case (actionType.DECREMENT):
            return updateObject(state, {counter: state.counter - 1});  // example using utility func to save some code
        case (actionType.ADD):
            return {
                ...state,
                // 'value' prop established in Counter.js
                counter: state.counter + action.value
            }
        case (actionType.SUBTRACT):
            return {
                ...state,
                counter: state.counter - action.value
            }
    }
    return state;  // default - return state give which is basically a no-op
}

export default reducer;