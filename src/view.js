import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';

import { Provider } from 'react-redux'
import App from './components/App'
import reducers from './reducers/reducers'

import { createStore, applyMiddleware } from "redux";
import logger from "./config/logger";
import async from "./config/async";
import {DEFAULT_FILTER_STRUCTURE, DEFAULT_SORT_STRUCTURE} from './containers/Record';

import registerServiceWorker from './registerServiceWorker';

let initialState={
                    importances:[],
                    tasks:[],
                    filter:DEFAULT_FILTER_STRUCTURE,
                    currentTask: -1,
                    editTask:false,
                    calendar: new Date(),
                    sort:DEFAULT_SORT_STRUCTURE
                }
const store = createStore(reducers, initialState, applyMiddleware(logger, async));


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);


registerServiceWorker();
