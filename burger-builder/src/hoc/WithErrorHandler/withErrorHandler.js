import React, {Fragment, useEffect, useState} from 'react';
import Modal from '../../components/UI/Modal/Modal'

/**
 * Wrapper function component to handle axois errors by
 * presenting an error Modal (dialog) when a globally configured
 * axios interceptor indicates an error has occurred. 
 * Note use of double arrows (curried function):
 *   read: func(WrappedComponent, axois) returns func(props)
 **/ 
const withErrorHandler = (WrappedComponent, axois) => props => {
    const [error, setError] = useState(null);

    useEffect(() => {
        axois.interceptors.request.use(req => {
            setError(null);  // clear any prior errors
            return req;
        });

        // resp => resp means return response
        axois.interceptors.response.use(resp => resp, error => {
            console.log("global response interceptor error:" + error.message);
            setError(error);
            
        });
    }, []);  // empty state props array means only run on componentDidMount

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