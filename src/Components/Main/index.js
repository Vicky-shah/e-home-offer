import React, { Component } from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import LoginModal from './../LoginModal';
// import routes from "../../routes/index";
import PrivateRoute from '../Routes/PrivateRoute';
import Listings from '../../Pages/Listings';
import RentListing from '../../Pages/RentListing';
import FavoritePage from '../../Pages/FavoritePage';
import ListPage from '../../Pages/ListPage';
import PropertyView from '../../Pages/PropertyView';
import Login from '../../Pages/Login';
import MainPage from '../../Pages/MainPage';
import { createBrowserHistory } from 'history';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EventBus from 'eventing-bus';
import RedirectUri from '../../Pages/RedirectUrl';
import WizardComponent from '../../Pages/wizard';

const hist = createBrowserHistory();

class Main extends Component {
  componentDidMount() {
    EventBus.on('info', this.handleInfo);

    EventBus.on('error', this.handleError);

    EventBus.on('success', this.handleSuccess);
    hist.push('/');
  }

  handleSuccess = (e) =>
    toast.success(e, {
      autoClose: 10000,
      draggable: true,
      closeOnClick: true,
      pauseOnHover: false,
      hideProgressBar: true,
      position: 'bottom-left',
    });

  handleError = (e) =>
    toast.error(e, {
      position: 'bottom-left',
      autoClose: 10000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
    });

  handleInfo = (e) =>
    toast.info(e, {
      position: 'bottom-left',
      autoClose: 10000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
    });

  render() {
    return (
      <div className='App'>
        <ToastContainer position='bottom-center' autoClose={5000} hideProgressBar newestOnTop closeOnClick rtl={false} pauseOnVisibilityChange={false} draggable pauseOnHover={false} />
        {/* <Router> */}
          <Switch>
            <Route exact path='/Favorites' component={FavoritePage} />

            <Route exact path='/list' component={ListPage} />
            {/*MainPage*/}
            <Route exact path='/' component={Listings} />
            <Route exact path='/main-page' component={MainPage} />
            <Route path='/property-view/:title' component={PropertyView} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/rent-listing' component={RentListing} />
            <Route exact path='/homedetails' component={Listings} />
            <Route exact path='/homedetails/:key/:id' component={Listings} />
            <Route exact path='/homedetails/:key/:id/:uid' component={Listings} />
            <Route exact path='/redirecturi' component={RedirectUri} />
            <Route exact path='/homedetails/:key' component={Listings} />
            <Route exact path='/wizard/:id' component={WizardComponent} />
            <Route path='/' render={({ location }) => <Redirect to={location.hash.replace('#/', '')} />} />
          </Switch>
        {/* </Router> */}
        <LoginModal />
      </div>
    );
  }
}

export default Main;
