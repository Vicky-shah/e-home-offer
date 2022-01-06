import React from "react";
import ReactDOM from "react-dom";
import { hydrate, render } from 'react-dom';
import { Provider } from "react-redux";
import { applyMiddleware, createStore, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import loggerMiddleware from "./store/middleware/logger";
import monitorReducerEnhancer from "./store/enhancers/monitorReducer";
import "./index.css";
import App from "./App.js";
import * as serviceWorker from "./serviceWorker";
import { logger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './store/sagas';
import rootReducer from "./store/reducers/Auth";
import reportWebVitals from './reportWebVitals';

const sagaMiddleware = createSagaMiddleware();
const middlewareEnhancer = applyMiddleware(loggerMiddleware, thunkMiddleware);
const composedEnhancers = compose(middlewareEnhancer, monitorReducerEnhancer);

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

// const store = createStore(rootReducer, undefined, composedEnhancers);
sagaMiddleware.run(rootSaga);


render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root'),
);
if (module.hot) module.hot.accept(App);

reportWebVitals();
serviceWorker.unregister();

// ReactDOM.render(
//  <Provider store={store}>
//   <App />
//  </Provider>,
//  document.getElementById("root")
// );
//
// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
