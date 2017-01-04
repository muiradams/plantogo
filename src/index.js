import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/App';
import Welcome from './components/Welcome';
import ShowUser from './components/ShowUser';
import TripList from './components/TripList';
import TripDetail from './components/TripDetail';

import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Welcome} />
          <Route path="/user/:username" component={ShowUser}>
            <IndexRoute component={TripList} />
            <Route path="/user/:username/:tripid" component={TripDetail} />
          </Route>
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
