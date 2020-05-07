import * as actionType from '../actions/actionType'


const initialState = {
    totalPrice: 4,
}

const priceReducer = (state = initialState, action) => {

    switch(action.type) {
        case (actionType.UPDATE_PRICE): {
            console.log('updated price', action)
            return {
                ...state,
                // updated price passed in is a negative value when ingredient is removed
                totalPrice: state.totalPrice + action.price 
            }
        }
        case actionType.SET_INGREDIENTS:  // note how this action is handled here and in ingredientsReducer
            return {
                ...state,
                totalPrice: 4,
            }
        default:
            return state;
    }
}

export default priceReducer;