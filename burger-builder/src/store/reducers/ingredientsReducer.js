import * as actionType from '../actionType'

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0,
    }
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
        case (actionType.REMOVE_INGREGIENT): {
            return {
                ...state,
                ingredients: {
                    // must deep copy for immutability 
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                }
            }
        }
        default:
            return state;
    }
}

export default ingredientsReducer;