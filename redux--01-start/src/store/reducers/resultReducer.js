import * as actionType from '../actions';

const initialState = {
    results: [],
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
        case (actionType.STORE_RESULT):
            return {
                ...state,
                // note use of concat() which make an array copy, instead of push()
                results: state.results.concat({id: new Date(), value: action.result})
            }
        case (actionType.DELETE_RESULT):
            // note use of filter() which make an array copy, instead of splice()
            const updatedArray = state.results.filter( (result, index) => result.id != action.resId); 
            return {
                ...state,
                results: updatedArray
            }
    }
    return state;  // default - return state give which is basically a no-op
}

export default reducer;