import * as actionType from './actionType'
import axios from '../../axios-orders'


// define action creators, a convienience for defining a redux action
export const addIngredient = (ingredientName) => {
    return {
        type: actionType.ADD_INGREDIENT,
        ingredientName: ingredientName
    }
}

export const removeIngredient = (ingredientName) => {
    return {
        type: actionType.REMOVE_INGREDIENT,
        ingredientName: ingredientName
    }
}

const setIngredients = (ingredients) => {
    return {
        type: actionType.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

const fetchIngredientsFailed = () => {
    return {
        type: actionType.FETCH_INGREDIENTS_FAILED
    }
}

/** Redux Thunk action to run an async operation.  Note the "thunk" pattern here:
An action creator that instead of just returning a type and value(s) object,
returns an anonymous function that ultimately performs a dispatch of a type and
value(s) object.  This is effectively evaluated as middleware occurring between 
dispatch of this action and the reception by a reducer.  In other words, this
allows the Rest call to be made BEFORE the ultimate dispatches for success or fail.
*/
export const initIngredients = () => {
    return (dispatch) => {
        axios.get('https://react-my-burger-fc12a.firebaseio.com/ingredients.json')
        .then(resp => {
            dispatch(setIngredients(resp.data));
        })
        .catch(error => {
            console.log(error);
            dispatch(fetchIngredientsFailed())
        });
    }
}