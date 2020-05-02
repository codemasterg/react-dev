
const initialState = {
    counter: 0,
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
        case ('INCREMENT'):
            return {
                ...state,   // use spread op to make a shallow copy, every level of nesting must be copied
                counter: state.counter + 1
            }
        case ('DECREMENT'):
            return {
                ...state,
                counter: state.counter - 1
            }
        case ('ADD'):
            return {
                ...state,
                // 'value' prop established in Counter.js
                counter: state.counter + action.value
            }
        case ('SUBTRACT'):
            return {
                ...state,
                counter: state.counter - action.value
            }
        case ('STORE_RESULT'):
            return {
                ...state,
                // note use of concat() which make an array copy, instead of push()
                results: state.results.concat({id: new Date(), value: state.counter})
            }
        case ('DELETE_RESULT'):
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