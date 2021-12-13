import React from "react";
import { HashRouter as Router } from "react-router-dom";
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
const App = () => {
  return (
    <Router>
      <div className="App">
        <Main />
        <MyFooter />
      </div>
      <NotificationContainer />
    </Router>
  );
};

export default App;
