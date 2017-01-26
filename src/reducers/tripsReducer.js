import {
  CLEAR_TRIP,
  FETCHING,
  FETCH_ACTIVITY,
  FETCH_TRIPLIST,
  FETCH_TRIP,
  HAS_EVER_CREATED_TRIP,
} from '../actions/types';

const INITIAL_STATE = {
  allTrips: [],
  trip: null,
  activity: null,
  isFetching: false,
  hasEverCreatedATrip: false,
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCHING:
      return { ...state, isFetching: true, }
    case FETCH_ACTIVITY:
      return {
        ...state,
        activity: action.payload,
        isFetching: false,
      };
    case FETCH_TRIP:
      return {
        ...state,
        trip: action.payload,
        activity: null,
        isFetching: false,
      };
    case FETCH_TRIPLIST:
      return {
        ...state,
        allTrips: action.payload,
        isFetching: false,
      };
    case HAS_EVER_CREATED_TRIP:
      return { ...state, hasEverCreatedATrip: true }
  }

  return state;
}
