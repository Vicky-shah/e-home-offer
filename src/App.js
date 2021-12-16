import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Main from "./Components/Main";
import MyFooter from "./Components/MyFooter";
import "react-multi-carousel/lib/styles.css";
import "./responsive.css"
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { createBrowserHistory } from 'history';

const hist = createBrowserHistory();

const App = () => {
  return (
    <Router history={hist}>
      <div className="App">
        <Main />
        <MyFooter />
      </div>
      <NotificationContainer />
    </Router>
  );
};

export default App;
