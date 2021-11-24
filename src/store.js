import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from '@redux-saga/core';
import rootReducer from './reducers';
import {
  loginWatcher as loginSaga,
  registerWatcher as registerSaga,
} from './sagas/auth';
import {allWatchers} from './sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(allWatchers);

export default store;
