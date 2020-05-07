import * as actionType from './actionType'
import axios from 'axios'  // not the instance for this app, just normal axios

export const authStart = () => {
    return {
        type: actionType.AUTH_START,
    }
}

export const authSuccess = (authData) => {
    return {
        type: actionType.AUTH_SUCCESS,
        authData: authData
    }
}

export const authFail = (error) => {
    return {
        type: actionType.AUTH_FAIL,
        error: error
    }
}

export const auth = (email, passwd) => {
    console.log('[Action auth] ')
    return (dispatch) => {
        dispatch(authStart());

        // rest call to authenticate per;
        // https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
        const authData = {
            email: email,
            password: passwd,
            returnSecureToken: true,
        }
        axios.post(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBxMymHILuTz6F532DHK1gD1yftIq2aIUQ',
                authData)
            .then(response => {
                console.log(response);
                dispatch(authSuccess(response.data));
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err));
            })

    }
}