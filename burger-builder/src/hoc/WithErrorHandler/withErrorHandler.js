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
 * caller is created, not on each state change and we don't want to 
 * setup these interceptors multiple times as could be the case in useEffect.
 **/ 
const withErrorHandler = (WrappedComponent, axois) => props => {
    const [error, setError] = useState(null);
    const [requestInterceptor, setRequestInterceptor] = useState(null);
    const [responseInterceptor, setResponseInterceptor] = useState(null);

    console.log('withErrorHandler called');
    if (requestInterceptor == null) {
        setRequestInterceptor(axois.interceptors.request.use(req => {
            setError(null);  // clear any prior errors
            return req;
        }));
    }

    // resp => resp means a function that just returns the response
    if(responseInterceptor == null) {
        setResponseInterceptor(axois.interceptors.response.use(resp => resp, error => {
            console.log("global response interceptor error:" + error.message);
            setError(error);

        }));
    }

    useEffect(() => {
        // nothing to do on each DOM update, return function is to cleanup interceptors
        return( () => {
            console.log("removing interceptors");
            axois.interceptors.request.eject(requestInterceptor);
            axois.interceptors.response.eject(responseInterceptor);
            console.log("wrapping component cleanup done")
        })
    })

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