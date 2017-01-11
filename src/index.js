import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import Welcome from './components/Welcome';
import Signin from './components/authentication/Signin';
import Signup from './components/authentication/Signup';
import Forgot from './components/authentication/Forgot';
import Reset from './components/authentication/Reset';
import ShowUser from './components/ShowUser';
import TripList from './components/TripList';
import TripDetail from './components/TripDetail';
import UpdateActivity from './components/UpdateActivity';
import RequireAuthentication from './components/authentication/RequireAuthentication';
import { AUTH_USER } from './actions/types';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers)

const token = localStorage.getItem('token');
// If we have a token then consider the user to be signed in already
if (token) {
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route component={App}>
        <Route path="/" component={Welcome}>
          <IndexRoute component={Signin} />
          <Route path="/signup" component={Signup} />
          <Route path="/forgot" component={Forgot} />
          <Route path="/reset/:token" component={Reset} />
        </Route>
        <Route path="/user/:username" component={RequireAuthentication(ShowUser)}>
          <IndexRoute component={TripList} />
          <Route path="/user/:username/trip/:tripId" component={TripDetail} />
          <Route path="/user/:username/trip/:tripId/activity/:activityId" component={UpdateActivity} />
        </Route>
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
