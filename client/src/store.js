import { createStore, applyMiddleware } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import { createEpicMiddleware } from 'redux-observable';

import rootReducer from './reducers/index';
import rootEpic from './epics';

const defaultState = {};

const epicMiddleware = createEpicMiddleware(rootEpic);

const store = createStore(rootReducer, defaultState, applyMiddleware(epicMiddleware));

export const history = syncHistoryWithStore(browserHistory, store);

export default store;

