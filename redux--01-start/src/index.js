import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'  // supports async redux operations, see actions.js
import {Provider} from 'react-redux'
import counterReducer from './store/reducers/counterReducer'
import resultReducer from './store/reducers/resultReducer'

const combinedReducers = combineReducers({
    ctrReducer: counterReducer,
    resReducer: resultReducer
});

// example of middleware.  define a function that returns a function to be
// executed by Redux before the reducers are executed.
const logger = (store) => {  // redux store
    return (next) => {
        return (action) => {
            console.log('[Middleware] Dispatching ', action)
            const result = next(action);  // the next action to perform after this middleware runs
            console.log('[Middleware] next state ', store.getState());
            return result;
        }
    }
}

// for Redux devtools support, add plugin to Chrome via 
// https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en
// and follow link on page for setup instructions. Using Advanced instructions here.
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// you can pass more than one middleware function to applyMiddleware, 
// just use CSVs.
const store = createStore(combinedReducers, composeEnhancers(applyMiddleware(logger, thunk)));

// Connect store to our app.
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
