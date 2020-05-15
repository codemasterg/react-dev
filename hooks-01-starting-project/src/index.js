import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import AuthContextProvider from './context/auth-context';

// make the authentication context available to all components in App
ReactDOM.render(<AuthContextProvider><App /></AuthContextProvider>, document.getElementById('root'));
