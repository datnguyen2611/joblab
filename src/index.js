import React from 'react';
//import ReactDOM from 'react-dom';
//import { hydrate, render } from "react-dom";
import { render } from 'react-snapshot';
//import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
//import Routes from './Routes';
import { ConnectedRouter } from 'connected-react-router';

import { Provider } from 'react-redux';
import configureStore, {history} from 'redux_store/index';
import ReactGA from 'react-ga';

import "styles/style";

import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

import { requestInitUser } from 'actions/Auth'; 
import { requestInitList } from 'actions/List';

import '@fortawesome/fontawesome-free/css/all.min.css';


//combined reducer from import
const store = configureStore();

/* 
const store = createStore(reducer,
  applyMiddleware(sagaMiddleware)
);
*/

//sagaMiddleware.run(rootSaga);

store.dispatch(requestInitUser());
store.dispatch(requestInitList());

ReactGA.initialize('UA-160190687-2');

history.listen((location, action) => {
    ReactGA.pageview(location.pathname + location.search);
    console.log(location.pathname)
    window.scrollTo(0, 0);
    
});

ReactGA.pageview('/');

//ReactDOM.render(

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <ReactNotification />
        <Routes onUpdate={() => window.scrollTo(0, 0)} />
      </div>
    </ConnectedRouter >
  </Provider>,
  document.getElementById('root') 
);

/*
const rootElement = document.getElementById("root");

  if (rootElement.hasChildNodes()) {
    hydrate(<Provider store={store}>
              <ConnectedRouter history={history}>
                <div>
                  <ReactNotification />
                  <Routes onUpdate={() => window.scrollTo(0, 0)} />
                </div>
              </ConnectedRouter >
            </Provider>, rootElement);
  } else {
    render(<Provider store={store}>
              <ConnectedRouter history={history}>
                <div>
                  <ReactNotification />
                  <Routes onUpdate={() => window.scrollTo(0, 0)} />
                </div>
              </ConnectedRouter >
            </Provider>, rootElement);
  }*/