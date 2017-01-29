import axios from 'axios';
import { browserHistory } from 'react-router';
import moment from 'moment';
import {
  AUTH_ERROR,
  AUTH_USER,
  CLEAR_ERROR,
  CLEAR_MEASUREMENTS,
  DELETE_ACTIVITY,
  DELETE_TRIP,
  DONE_FETCHING,
  FETCHING,
  FETCHED_ACTIVITY,
  FETCHED_TRIP,
  FETCHED_TRIPLIST,
  HAS_EVER_CREATED_TRIP,
  SAVE_MEASUREMENTS,
  UNAUTH_USER,
} from './types';

// Assign SERVER_URL in webpack.config.prod.js when deploying
const API_URL = process.env.SERVER_URL;

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error,
  };
}

export function clearError() {
  return { type: CLEAR_ERROR, };
}

export function signinUser({ username, password }) {
  return function(dispatch) {
    dispatch({ type: FETCHING, });

    axios.post(`${API_URL}/signin`, { username, password })
      .then(response => {
        dispatch({ type: DONE_FETCHING, });
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        browserHistory.push(`/user/${username}`);
      })
      .catch(error => {
        dispatch({ type: DONE_FETCHING, });
        dispatch(authError('Incorrect username or password'));
        setTimeout(() => dispatch({ type: CLEAR_ERROR, }), 3000);
      });
  };
}

export function signupUser({ email, username, password }) {
  return function(dispatch) {
    dispatch({ type: FETCHING, });

    axios.post(`${API_URL}/signup`, { email, username, password })
      .then(response => {
        dispatch({ type: DONE_FETCHING, });
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        browserHistory.push(`/user/${username}`);
      })
      .catch(error => {
        dispatch({ type: DONE_FETCHING, });
        dispatch(authError(error.response.data.error));
        setTimeout(() => dispatch({ type: CLEAR_ERROR, }), 3000);
      });
  };
}

export function signoutUser() {
  localStorage.removeItem('token');
  return { type: UNAUTH_USER, };
}

export function forgotPassword({ email }) {
  return function(dispatch) {
    dispatch({ type: FETCHING, });

    axios.post(`${API_URL}/forgot`, { email })
      .then(response => {
        dispatch({ type: DONE_FETCHING, });
        dispatch(authError(response.data.message));
      })
      .catch(error => {
        dispatch({ type: DONE_FETCHING, });
        dispatch(authError(error.response.data.error));
        setTimeout(() => dispatch({ type: CLEAR_ERROR, }), 3000);
      });
  };
}

export function resetPassword({ password }, token) {
  return function(dispatch) {
    dispatch({ type: FETCHING, });

    axios.post(`${API_URL}/reset/${token}`, { password })
      .then(response => {
        dispatch({ type: DONE_FETCHING, });
        dispatch(authError(response.data.message));
        setTimeout(() => dispatch({ type: CLEAR_ERROR, }), 3000);
        browserHistory.push('/');
      })
      .catch(error => {
        dispatch({ type: DONE_FETCHING, });
        dispatch(authError(error.response.data.error));
      });
  };
}

export function fetchTripList(username) {
  return function(dispatch) {
    dispatch({ type: FETCHING, });

    axios.get(`${API_URL}/user/${username}`, {
      headers: { Authorization: localStorage.getItem('token')}
    })
    .then(response => {
      // First, sort the activities within each trip by start day/time
      const fetchedTrips = response.data.map(function(trip) {
        const fetchedActivities = trip.activities;
        const mappedActivities = fetchedActivities.map(function(activity, index) {
          const start = moment(activity.start);
          return { index, start };
        });

        mappedActivities.sort(function(a, b) {
          return +(b.start.isBefore(a.start)) || +(a.start.isSame(b.start)) - 1;
        });

        const activities = mappedActivities.map(function(activity) {
          return fetchedActivities[activity.index];
        });

        // If the trip is over, then add a flag
        if (activities.length > 0) {
          const lastActivity = activities[activities.length - 1];
          const currentDate = moment();
          let tripEndDate = moment(lastActivity.start);
          let isTripOver = false;

          if (lastActivity.end) tripEndDate = moment(lastActivity.end);

          if (tripEndDate.isBefore(currentDate)) isTripOver = true;

          return { ...trip, activities, isTripOver };
        }

        // Check to see if user has created any trips other than example trip
        if (trip.tripName !== 'Paris (Example Trip)') {
          dispatch({
            type: HAS_EVER_CREATED_TRIP,
          });
        }

        return trip;
      });

      // Then, sort trips by first activity's start before sending them on
      const mappedTrips = fetchedTrips.map(function(trip, index) {
        let start;
        if (trip.activities.length > 0) {
          start = moment(trip.activities[0].start);
        } else {
          start = moment('1900-01-01');
        }
        return { index, start };
      });

      mappedTrips.sort(function(a, b) {
        return +(b.start.isBefore(a.start)) || +(a.start.isSame(b.start)) - 1;
      });

      const trips = mappedTrips.map(function(trip) {
        return fetchedTrips[trip.index];
      });

      dispatch({ type: DONE_FETCHING, });
      dispatch({
        type: FETCHED_TRIPLIST,
        payload: trips,
      });
    })
    .catch(error => {
      dispatch({ type: DONE_FETCHING, });
      dispatch(authError(error.response.data.error));
      setTimeout(() => dispatch({ type: CLEAR_ERROR, }), 3000);
    });
  }
}

export function clearTripsFromStore() {
  return {
    type: FETCHED_TRIPLIST,
    payload: null,
  }
}

export function fetchTrip(username, tripId) {
  return function(dispatch) {
    dispatch({ type: FETCHING, });

    axios.get(`${API_URL}/user/${username}/trip/${tripId}`, {
      headers: { Authorization: localStorage.getItem('token')}
    })
    .then(response => {
      /*
       * Split lodging and car activities into separate checkin/checkout and
       * pickup/return activities, respectively, and add them to the array of
       * all activities to be sorted
       */
      const fetchedActivities = response.data.activities;
      const lodgingAndCarActivities = fetchedActivities.filter(function(activity) {
        const name = activity.activityType;
        return activity.end && (name === 'lodging' || name === 'car' );
      });
      const newActivities = lodgingAndCarActivities.map(function(activity) {
        const start = activity.end;
        const isSecondPart = true;
        return { ...activity, start, isSecondPart };
      });

      const allActivities = [...fetchedActivities, ...newActivities];

      // Sort the activities by start day/time before sending them on
      const mappedActivities = allActivities.map(function(activity, index) {
        const start = moment(activity.start);
        return { index, start };
      });

      mappedActivities.sort(function(a, b) {
        return +(b.start.isBefore(a.start)) || +(a.start.isSame(b.start)) - 1;
      });

      const activities = mappedActivities.map(function(activity) {
        return allActivities[activity.index];
      });

      dispatch({ type: DONE_FETCHING, });
      dispatch({
        type: FETCHED_TRIP,
        payload: { ...response.data, activities },
      });
    })
    .catch(error => {
      dispatch({ type: DONE_FETCHING, });
      dispatch(authError(error.response.data.error));
      setTimeout(() => dispatch({ type: CLEAR_ERROR, }), 3000);
    });
  }
}

export function createTrip(username, tripName) {
  return function(dispatch) {
    dispatch({ type: FETCHING, });

    axios.post(`${API_URL}/user/${username}`,
      { tripName },
      { headers: { Authorization: localStorage.getItem('token') }
      })
      .then(response => {
        dispatch({ type: DONE_FETCHING, });
        const tripId = response.data.tripId;
        browserHistory.push(`/user/${username}/trip/${tripId}`);
      })
      .catch(error => {
        dispatch({ type: DONE_FETCHING, });
        dispatch(authError(error.response.data.error));
        setTimeout(() => dispatch({ type: CLEAR_ERROR, }), 3000);
      });
  };
}

export function editTrip(username, tripId, tripName) {
  return function(dispatch) {
    dispatch({ type: FETCHING, });

    axios.put(`${API_URL}/user/${username}/trip/${tripId}`,
      { tripName },
      { headers: { Authorization: localStorage.getItem('token') }
      })
      .then(response => {
        dispatch({ type: DONE_FETCHING, });
        dispatch(fetchTrip(username, tripId));
        dispatch(fetchTripList(username));
        browserHistory.push(`/user/${username}/trip/${tripId}`);
      })
      .catch(error => {
        dispatch({ type: DONE_FETCHING, });
        dispatch(authError(error.response.data.error));
        setTimeout(() => dispatch({ type: CLEAR_ERROR, }), 3000);
      });
  };
}

export function deleteTrip(username, tripId) {
  return function(dispatch) {
    dispatch({ type: FETCHING, });

    axios.delete(`${API_URL}/user/${username}/trip/${tripId}`,
      { headers: { Authorization: localStorage.getItem('token') }})
      .then(response => {
        dispatch({ type: DONE_FETCHING, });
        browserHistory.push(`/user/${username}`);
      })
      .catch(error => {
        dispatch({ type: DONE_FETCHING, });
        dispatch(authError(error.response.data.error));
        setTimeout(() => dispatch({ type: CLEAR_ERROR, }), 3000);
      });
  };
}

export function clearTripFromStore() {
  return {
    type: FETCHED_TRIP,
    payload: null,
  }
}

export function fetchActivity(username, tripId, activityId) {
  return function(dispatch) {
    dispatch({ type: FETCHING, });

    axios.get(`${API_URL}/user/${username}/trip/${tripId}/activity/${activityId}`, {
      headers: { Authorization: localStorage.getItem('token')}
    })
    .then(response => {
      const startISOString = response.data.start;
      const start = moment(startISOString);
      const startDate = start.clone().toDate();
      const startTime = start.clone().toDate();

      const endISOString = response.data.end;
      let endDate = { null };
      let endTime = { null };
      if (endISOString) {
        const end = moment(endISOString);
        endDate = end.clone().toDate();
        endTime = end.clone().toDate();
      }

      dispatch({ type: DONE_FETCHING, });
      dispatch({
        type: FETCHED_ACTIVITY,
        payload: { ...response.data, startDate, startTime, endDate, endTime, },
      });
    })
    .catch(error => {
      dispatch({ type: DONE_FETCHING, });
      dispatch(authError(error.response.data.error));
      setTimeout(() => dispatch({ type: CLEAR_ERROR, }), 3000);
      browserHistory.push('/');
    });
  }
}

export function createActivity(username, tripId, activityData) {
  return function(dispatch) {
    dispatch({ type: FETCHING, });

    axios.post(`${API_URL}/user/${username}/trip/${tripId}/activity`,
      activityData,
      { headers: { Authorization: localStorage.getItem('token') }
      })
      .then(response => {
        dispatch({ type: DONE_FETCHING, });
        dispatch(clearTripsFromStore());
        dispatch(fetchTripList(username));
        browserHistory.push(`/user/${username}/trip/${tripId}`);
      })
      .catch(error => {
        dispatch({ type: DONE_FETCHING, });
        dispatch(authError(error.response.data.error));
        setTimeout(() => dispatch({ type: CLEAR_ERROR, }), 3000);
      });
  };
}

export function startBlankActivity({ username, tripId, start }) {
  return function(dispatch) {
    if (start) {
      const startDate = start.clone().toDate();
      const startTime = start.clone().toDate();
      dispatch({
        type: FETCHED_ACTIVITY,
        payload: { startDate, startTime },
      });
    }

    browserHistory.push(`/user/${username}/trip/${tripId}/activity/`);
  };
}

export function updateActivity(username, tripId, activityData) {
  return function(dispatch) {
    dispatch({ type: FETCHING, });

    axios.put(`${API_URL}/user/${username}/trip/${tripId}/activity/${activityData._id}`,
      activityData,
      { headers: { Authorization: localStorage.getItem('token') }
      })
      .then(response => {
        dispatch({ type: DONE_FETCHING, });
        dispatch(clearTripFromStore());
        dispatch(clearTripsFromStore());
        dispatch(fetchTripList(username));
        browserHistory.push(`/user/${username}/trip/${tripId}`);
      })
      .catch(error => {
        dispatch({ type: DONE_FETCHING, });
        dispatch(authError(error.response.data.error));
        setTimeout(() => dispatch({ type: CLEAR_ERROR, }), 3000);
      });
  };
}

export function deleteActivity(username, tripId, activityId) {
  return function(dispatch) {
    dispatch({ type: FETCHING, });

    axios.delete(`${API_URL}/user/${username}/trip/${tripId}/activity/${activityId}`,
      { headers: { Authorization: localStorage.getItem('token') }})
      .then(response => {
        dispatch({ type: DONE_FETCHING, });
        dispatch(clearTripsFromStore());
        dispatch(fetchTripList(username));
        browserHistory.push(`/user/${username}/trip/${tripId}`);
      })
      .catch(error => {
        dispatch({ type: DONE_FETCHING, });
        dispatch(authError(error.response.data.error));
        setTimeout(() => dispatch({ type: CLEAR_ERROR, }), 3000);
      });
  };
}

export function saveMeasurements(top, index) {
  const measurement = {
    index,
    top,
  };

  return {
    type: SAVE_MEASUREMENTS,
    payload: measurement,
  }
}

export function clearMeasurements() {
  return {
    type: CLEAR_MEASUREMENTS,
    payload: [],
  }
}
