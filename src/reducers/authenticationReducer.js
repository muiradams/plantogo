import {
  AUTH_ERROR,
  AUTH_USER,
  CLEAR_ERROR,
  UNAUTH_USER,
} from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case AUTH_ERROR:
      return { ...state, error: action.payload, };
    case AUTH_USER:
      return { ...state, authenticated: true, error: '', };
    case CLEAR_ERROR:
      return { ...state, error: '', };
    case UNAUTH_USER:
      return { ...state, authenticated: false, };
  }

  return state;
}
