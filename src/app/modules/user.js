const SIGN_OFF = 'tv-watch-list/user/SIGN_OFF';
const TOGGLE_NEW_USER = 'tv-watch-list/user/TOGGLE_NEW_USER';
const REQUEST_USER = 'tv-watch-list/user/REQUEST_USER';
const REQUEST_SUCCESS = 'tv-watch-list/user/REQUEST_SUCCESS';
const NO_ACTIVE_SESSION = 'tv-watch-list/user/NO_ACTIVE_SESSION';
const REQUEST_FAILED = 'tv-watch-list/user/REQUEST_FAILED';

const defaultState = {
  username: '',
  signedIn: false,
  newUser: false,
  fetching: false,
  errors: '',
};


// ----------------------- Reducer ---------------------------

const user = (state = defaultState, action) => {
  switch (action.type) {
    case REQUEST_USER:
      return {
        ...state,
        fetching: true,
      };
    case REQUEST_FAILED:
      return {
        ...state,
        fetching: false,
        errors: action.errors.message,
      };
    case REQUEST_SUCCESS:
      return {
        ...state,
        fetching: false,
        signedIn: true,
        newUser: false,
        username: action.result.username,
      };
    case SIGN_OFF:
      return {
        ...state,
        username: '',
        fetching: false,
        signedIn: false,
        errors: '',
      };
    case TOGGLE_NEW_USER:
      return {
        ...state,
        newUser: !state.newUser,
      };
    case NO_ACTIVE_SESSION:
    default:
      return state;
  }
};

export default user;

// ---------------------- action creators ---------------------

export const toggleNewUser = () => ({
  type: TOGGLE_NEW_USER,
});

// ---------------- api request action creators -----------------------
// types array needs REQUEST, SUCCESS, FAILURE types for the corresponding
// actions in that order. Optional 4th type for 204 status.

export const continueSession = () => ({
  types: [REQUEST_USER, REQUEST_SUCCESS, REQUEST_FAILED, NO_ACTIVE_SESSION],
  request: new Request('/api/auth/continue', {
    method: 'GET',
  }),
});

export const signup = formData => ({
  types: [REQUEST_USER, REQUEST_SUCCESS, REQUEST_FAILED],
  request: new Request('/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    body: formData,
  }),
});

export const login = formData => ({
  types: [REQUEST_USER, REQUEST_SUCCESS, REQUEST_FAILED],
  request: new Request('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    body: formData,
  }),
});

export const logout = () => ({
  types: [REQUEST_USER, SIGN_OFF, REQUEST_FAILED],
  request: new Request('/api/auth/logout', {
    method: 'GET',
  }),
});

// ---------------------- Selectors ---------------------------------
