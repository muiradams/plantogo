import {
  DONE_FETCHING,
  FETCHING,
  FETCHED_ACTIVITY,
  FETCHED_TRIPLIST,
  FETCHED_TRIP,
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
    case DONE_FETCHING:
      return { ...state, isFetching: false, }
    case FETCHING:
      return { ...state, isFetching: true, }
    case FETCHED_ACTIVITY:
      return {
        ...state,
        activity: action.payload,
        // isFetching: false,
      };
    case FETCHED_TRIP:
      return {
        ...state,
        trip: action.payload,
        activity: null,
        // isFetching: false,
      };
    case FETCHED_TRIPLIST:
      return {
        ...state,
        allTrips: action.payload,
        // isFetching: false,
      };
    case HAS_EVER_CREATED_TRIP:
      return { ...state, hasEverCreatedATrip: true }
  }

  return state;
}
