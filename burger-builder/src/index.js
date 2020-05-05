import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers} from 'redux'
import {Provider} from 'react-redux';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import ingredientReducer from './store/reducers/ingredientsReducer'
import priceReducer from './store/reducers/priceReducer'

const combinedReducers = combineReducers({
    ingReducer: ingredientReducer,
    priceReducer: priceReducer,
});

const store = createStore(combinedReducers);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
