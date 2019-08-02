import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
//import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas/rootSaga';

const initialState = {};
//const middlware = [thunk];
const sagaMiddleware = createSagaMiddleware();

/*eslint-disable */
const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose
/*eslint-enable */

const store = createStore(
    rootReducer,
    initialState,
    composeSetup(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export default store;