import {applyMiddleware, compose, createStore} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import reducers from 'reducers/index'
import {createBrowserHistory} from 'history'
import {routerMiddleware} from 'connected-react-router';
import { sagaMiddleware,rootSaga } from 'redux_saga/Saga'

const history = createBrowserHistory();
const routeMiddleware = routerMiddleware(history);

const middlewares = [sagaMiddleware, routeMiddleware];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export default function configureStore(initialState) {
  const store = createStore(reducers(history), initialState,
    composeWithDevTools(applyMiddleware(...middlewares)));

  sagaMiddleware.run(rootSaga);

  return store;
}

export {history};
