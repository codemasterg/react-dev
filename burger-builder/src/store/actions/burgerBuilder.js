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