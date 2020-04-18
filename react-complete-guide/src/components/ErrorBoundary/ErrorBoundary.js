import React, { Component } from 'react';

class ErrorBoundary extends Component {
    state = {
        hasError: false,
        errorMessage: ''
    }

    // called by react on error when ErrorBoundary wraps the element that threw exception
    catchError = (error, info) => {
        this.setState({
            hasError: true,
            errorMessage: error
        });
    }

    render() {

        if(this.state.hasError) {
            return(<h1>{this.state.errorMessage}</h1>);
        } else {
            // return the element wrapped by this catcher, basically proceed with
            // the functionality of the wrapped element.
            return(this.props.children);  
        }
    }
}

export default ErrorBoundary;