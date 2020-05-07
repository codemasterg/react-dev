import * as actionType from './actionType';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionType.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionType.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionType.PURCHASE_BURGER_START
    }
}


/** Redux Thunk action to run an async operation.  Note the "thunk" pattern here:
An action creator that instead of just returning a type and value(s) object,
returns an anonymous function that ultimately performs a dispatch of a type and
value(s) object.  This is effectively evaluated as middleware occurring between 
dispatch of this action and the reception by a reducer.  In other words, this
allows the Rest call to be made BEFORE the ultimate dispatches for success or fail.
*/
export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());

        axios.post('/orders.json', orderData)
        .then(response => {
            dispatch(purchaseBurgerSuccess(response.data.name, orderData))
        })
        .catch(error => {
            dispatch(purchaseBurgerFail(error));
        })
        .finally(() => {
            // place holder.  cannot call setState here because sucess case does a
            // redirect (history.push) which unmounts this component.
        })
    }
}

export const purchaseInit = () => {
    return {
        type: actionType.PURCHASE_INIT,
    }
}