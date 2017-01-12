import { FETCH_TRIPLIST, FETCH_TRIP, SET_ACTIVITY } from '../actions/types';

const INITIAL_STATE = { allTrips: [], trip: null, activity: null }

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_TRIP:
      return { ...state, trip: action.payload, activity: null, };
    case FETCH_TRIPLIST:
      return { ...state, allTrips: action.payload, };
    case SET_ACTIVITY:
      return { ...state, activity: action.payload, };
  }

  return state;
}
