import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  AUTH_ERROR,
  AUTH_USER,
  CLEAR_ERROR,
  CLEAR_MEASUREMENTS,
  FETCH_ACTIVITY,
  FETCH_TRIP,
  FETCH_TRIPLIST,
  SAVE_MEASUREMENTS,
  UNAUTH_USER,
} from './types';

const API_URL = "http://localhost:3090";

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
    axios.post(`${API_URL}/signin`, { username, password })
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        browserHistory.push(`/user/${username}`);
      })
      .catch(() => {
        dispatch(authError('Incorrect Username or Password'));
      });
  };
}

export function signupUser({ email, username, password }) {
  return function(dispatch) {
    axios.post(`${API_URL}/signup`, { email, username, password })
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        browserHistory.push(`/user/${username}`);
      })
      .catch(error => dispatch(authError(error.response.data.error)));
  };
}

export function signoutUser() {
  localStorage.removeItem('token');
  return { type: UNAUTH_USER, };
}

export function forgotPassword({ email }) {
  return function(dispatch) {
    axios.post(`${API_URL}/forgot`, { email })
      .then(response => {
        dispatch(authError('Check Your Inbox'));
      })
      .catch(() => {
        dispatch(authError('Incorrect Email'));
      });
  };
}

export function resetPassword({ password }, token) {
  return function(dispatch) {
    axios.post(`${API_URL}/reset/${token}`, { password })
      .then(response => {
        dispatch(authError('Your Password Has Been Changed'));
        browserHistory.push('/');
      })
      .catch(() => {
        dispatch(authError('This link is invalid or has expired'));
      });
  };
}

export function fetchTripList(username) {
  return function(dispatch) {
    axios.get(`${API_URL}/user/${username}`, {
      headers: { Authorization: localStorage.getItem('token')}
    })
    .then(response => {
      // TODO: sort the trips by their first activity's startTime before sending them on
      dispatch({
        type: FETCH_TRIPLIST,
        payload: response.data,
      });
    });
  }
}

export function fetchTrip(username, tripId) {
  return function(dispatch) {
    axios.get(`${API_URL}/user/${username}/trip/${tripId}`, {
      headers: { Authorization: localStorage.getItem('token')}
    })
    .then(response => {
      // TODO: sort the activities by startTime before sending them on
      dispatch({
        type: FETCH_TRIP,
        payload: response.data,
      });
    });
  }
}

export function fetchActivity(username, tripId, activityId) {
  return function(dispatch) {
    axios.get(`${API_URL}/user/${username}/trip/${tripId}/activity/${activityId}`, {
      headers: { Authorization: localStorage.getItem('token')}
    })
    .then(response => {
      dispatch({
        type: FETCH_ACTIVITY,
        payload: response.data,
      });
    });
  }
}

export function createActivity(username, tripId, activityData) {
  return function(dispatch) {
    axios.post(`${API_URL}/user/${username}/trip/${tripId}/activity`,
      activityData,
      { headers: { Authorization: localStorage.getItem('token') }
      })
      .then(response => {
        dispatch(clearTripFromStore());
        browserHistory.push(`/user/${username}/trip/${tripId}`);
      })
      .catch(() => {
        dispatch(authError(error.response.data.error));
      });
  };
}

export function updateActivity(username, tripId, activityData) {
  return function(dispatch) {
    axios.put(`${API_URL}/user/${username}/trip/${tripId}/activity/${activityData._id}`,
      activityData,
      { headers: { Authorization: localStorage.getItem('token') }
      })
      .then(response => {
        dispatch(clearTripFromStore());
        browserHistory.push(`/user/${username}/trip/${tripId}`);
      })
      .catch(() => {
        dispatch(authError(error.response.data.error));
      });
  };
}

export function clearTripFromStore() {
  return {
    type: FETCH_TRIP,
    payload: null,
  }
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
