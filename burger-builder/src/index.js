import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import ingredientReducer from './store/reducers/ingredientsReducer'
import priceReducer from './store/reducers/priceReducer'
import orderReducer from './store/reducers/order'

const combinedReducers = combineReducers({
    ingReducer: ingredientReducer,
    priceReducer: priceReducer,
    orderReducer: orderReducer,
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

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
