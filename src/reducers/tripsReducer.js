import { FETCH_TRIPLIST, FETCH_TRIP } from '../actions/types';

const INITIAL_STATE = { allTrips: [], trip: null }

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_TRIP:
      return { ...state, trip: action.payload };
    case FETCH_TRIPLIST:
      return { ...state, allTrips: action.payload };
  }

  return state;
}
