import React, {Fragment, useEffect, useState} from 'react';
import Modal from '../../components/UI/Modal/Modal'

/**
 * Wrapper function component (higher order component) to handle axois errors by
 * presenting an error Modal (dialog) when a globally configured
 * axios interceptor indicates an error has occurred. 
 * Note use of double arrows (curried function):
 *   read: func(WrappedComponent, axois) returns func(props).
 * 
 * useEffect not used because axois interceptors must be setup before
 * the caller's render (because it's possible axois is used before the
 * render).  That's ok though, this handler is only called when the 
 * caller is created, not on each state change.
 **/ 
const withErrorHandler = (WrappedComponent, axois) => props => {
    const [error, setError] = useState(null);

    console.log('withErrorHandler called');
    axois.interceptors.request.use(req => {
        setError(null);  // clear any prior errors
        return req;
    });

    // resp => resp means a function that just returns the response
    axois.interceptors.response.use(resp => resp, error => {
        console.log("global response interceptor error:" + error.message);
        setError(error);

    });

    const errorConfirmedHandler = () => {
        setError(null);
    }

    // present the given WrappedComponent and popup a dialog on error
    return(
        <Fragment>
            <Modal show={error !== null}
                modalClosed={errorConfirmedHandler}>
                {error != null ? error.message : null}
            </Modal>
            <WrappedComponent {...props} />
        </Fragment>
    );

}

export default withErrorHandler;