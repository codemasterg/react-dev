import * as actionType from '../actions/actionType'

const initialState = {
    ingredients: null,
    error: false
}

const ingredientsReducer = (state = initialState, action) => {

    switch(action.type) {
        case (actionType.ADD_INGREDIENT): {
            return {
                ...state,
                ingredients: {
                    // must deep copy for immutability 
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                }
            }
        }
        case (actionType.REMOVE_INGREDIENT): {
            return {
                ...state,
                ingredients: {
                    // must deep copy for immutability 
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                }
            }
        }
        case actionType.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                error: false,
            }
        case actionType.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }
}

export default ingredientsReducer;