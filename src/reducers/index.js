import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import tripsReducer from './tripsReducer';
import authenticationReducer from './authenticationReducer';
import measurementsReducer from './measurementsReducer';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authenticationReducer,
  trips: tripsReducer,
  measurements: measurementsReducer,
});

export default rootReducer;
