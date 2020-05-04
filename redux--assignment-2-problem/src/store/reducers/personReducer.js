import * as actionType from '../actionType'

const initialState = {
    persons: [],
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

    console.log(action);
    
    switch(action.type) {
        case (actionType.ADD_PERSON):
            return {
                ...state,
                // note use of concat() which make an array copy, instead of push()
                persons: state.persons.concat(action.person)
            }
        case (actionType.REMOVE_PERSON):
            // note use of filter() which make an array copy, instead of splice()
            const updatedArray = state.persons.filter( (person, index) => person.id != action.id);
            console.log(updatedArray);
            return {
                ...state,
                persons: updatedArray
            }
        
    }
    return state;  // default return given state, a no-op
}

export default reducer;