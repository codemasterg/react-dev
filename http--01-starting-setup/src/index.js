import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

/**
 * Example of axios global interceptors.  Used in index.js since it's the
 * place that we register our App with the DOM, so it's the "top-most"
 * place to ensure all requests and errors in this example are effected.
 */
axios.interceptors.request.use(request => {
    console.log(request);

    return request;  // must always return to continue
}, error => {
    console.log(error);
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    console.log(response);

    return response;  // must always return to continue
}, error => {
    console.log(error);
    return Promise.reject(error);
});

// example of axios global config.  not a fan of setting a default URL in JS, but this
// might be useful for common headers.
axios.defaults.baseURL='https://jsonplaceholder.typicode.com';
axios.defaults.headers.common['Authorization']='SOME AUTH TOKEN';

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
