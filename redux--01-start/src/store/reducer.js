
const initialState = {
    counter: 0,
    results: [],
}

// if state is under, use default param value 'initialState'
const reducer = (state = initialState, action) => {

    switch (action.type) {
        case ('INCREMENT'):
            return {
                ...state,
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
            const updatedArray = state.results.filter( (result, index) => result.id != action.resId); 
            return {
                ...state,
                // note use of concat() which make an array copy, instead of push()
                results: updatedArray
            }
    }
    return state;  // default - return state give which is basically a no-op
}

export default reducer;