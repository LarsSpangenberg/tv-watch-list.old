const SIGN_OFF = 'tv-watch-list/user/SIGN_OFF';
const NEW_USER = 'tv-watch-list/user/NEW_USER';
const RETURNING_USER = 'tv-watch-list/user/RETURNING_USER';
export const REQUEST_SUCCESS = 'tv-watch-list/user/REQUEST_SUCCESS';
export const REQUEST_FAILED = 'tv-watch-list/user/REQUEST_FAILED';

const defaultState = {
  signedIn: false,
  newUser: false,
  username: '',
  shows: [],
  errors: '',
};


// ----------------------- Reducer ---------------------------

export default function userReducer(state = defaultState, action) {
  switch (action.type) {
    case REQUEST_FAILED:
      return {
        ...state,
        errors: action.errors,
      };
    case REQUEST_SUCCESS:
      return {
        ...state,
        signedIn: true,
        newUser: false,
        username: action.username,
        shows: action.shows,
      };
    case SIGN_OFF:
      return {
        ...state,
        signedIn: false,
      };
    case NEW_USER:
      return {
        ...state,
        newUser: true,
      };
    case RETURNING_USER:
      return {
        ...state,
        newUser: false,
      };
    default:
      return state;
  }
}

// ---------------------- action creators ---------------------

export function requestSuccess(user) {
  return {
    type: REQUEST_SUCCESS,
    user,
  };
}

export function requestFailed(errors) {
  return {
    type: REQUEST_FAILED,
    errors,
  };
}

export function signOff() {
  return {
    type: SIGN_OFF,
  };
}

export function newUser() {
  return {
    type: NEW_USER,
  };
}

export function returningUser() {
  return {
    type: RETURNING_USER,
  };
}
