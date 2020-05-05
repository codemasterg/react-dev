import * as actionType from '../actionType'


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
        default:
            return state;
    }
}

export default priceReducer;