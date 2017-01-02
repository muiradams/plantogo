import { combineReducers } from 'redux';
import tripsReducer from './tripsReducer';
import measurementsReducer from './measurementsReducer';

const rootReducer = combineReducers({
  trips: tripsReducer,
  measurements: measurementsReducer,
});

export default rootReducer;
