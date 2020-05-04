import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {createStore, combineReducers} from 'redux'
import {Provider} from 'react-redux'

import personReducer from './store/reducers/personReducer'

// just single reducer for this assignmnt, combiner is included
// for future use.
const combinedReducers = combineReducers({
    perReducer: personReducer,
});

const store = createStore(combinedReducers);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
