import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  AUTH_ERROR,
  AUTH_USER,
  CLEAR_ERROR,
  CLEAR_MEASUREMENTS,
  FETCH_TRIP,
  FETCH_TRIPLIST,
  SAVE_MEASUREMENTS,
  SET_ACTIVITY,
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
      dispatch({
        type: FETCH_TRIP,
        payload: response.data,
      });
    });
  }
}

export function setActivity(activity) {
  return {
    type: SET_ACTIVITY,
    payload: activity,
  }
}

export function clearMeasurements() {
  return {
    type: CLEAR_MEASUREMENTS,
    payload: [],
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

// TODO: Remove this test data once the API server is setup
//using the ES Intl.DateTimeFormat object
var date1 = new Date(Date.UTC(2016, 4, 11, 3, 0, 0));
var date2 = new Date(Date.UTC(2017, 9, 8, 3, 0, 0));
var date3 = new Date(Date.UTC(2020, 1, 15, 3, 0, 0));

const trips = [
  {
    tripName: "Paris",
    tripDate: date1,
    tripActivities: [
      {
        activityName: "Flight to Paris",
        activityType: "flight",
        startTime: "9:00 a.m.",
        endTime: "1:00 p.m.",
        info: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      },
      {
        activityName: "Pick up Rental Car",
        activityType: "car",
        startTime: "2:00 p.m.",
        info: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      },
      {
        activityName: "Visit the Louvre",
        activityType: "sightseeing",
        startTime: "4:00 p.m.",
        endTime: "7:00 p.m.",
        info: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop.",
      },
      {
        activityName: "Return Flight",
        activityType: "flight",
        startTime: "11:00 p.m.",
        endTime: "11:59 p.m.",
        info: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      },
    ]
  },
  {
    tripName: "Israel",
    tripDate: date2,
  },
  {
    tripName: "Thailand",
    tripDate: date3,
  }
];
