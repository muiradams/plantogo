import { CLEAR_MEASUREMENTS, SAVE_MEASUREMENTS } from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case CLEAR_MEASUREMENTS:
      return {};
    case SAVE_MEASUREMENTS:
      const newMeasurement = {};
      newMeasurement[action.payload.index] = action.payload.top;
      return { ...state, ...newMeasurement };
  }

  return state;
}
