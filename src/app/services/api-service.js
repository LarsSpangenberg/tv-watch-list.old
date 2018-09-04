import {
  requestSuccess,
  requestFailed,
  signOff,
} from '../modules/user';

const CONTINUE_SESSION = 'tv-watch-list/api/CONTINUE_SESSION';
const LOGIN = 'tv-watch-list/api/LOGIN';
const LOGOUT = 'tv-watch-list/api/LOGOUT';
const SIGNUP = 'tv-watch-list/api/SIGNUP';


// -------------- api request ------------------------------

const request = next => (method, url, data) => {
  let init;
  switch (method) {
    case 'post':
      init = {
        method: 'POST',
        headers: { 'Content-type': 'application/x-www-form-urlencoded' },
        body: data,
      };
      break;

    case 'get':
    default:
      init = { method: 'GET' };
      break;
  }

  fetch(url, init)
    .then((res) => {
      if (url === '/api/auth/logout') {
        return next(signOff());
      }

      if (res.status !== 200) {
        throw res.json();
      }

      return res.json()
        .then(user => next(requestSuccess(user)));
    })
    .catch((err) => {
      next(requestFailed(err));
    });
};


// -------------- Reducer --------------------------------

const apiService = store => next => (action) => {
  next(action);
  const api = request(next);
  switch (action.type) {
    default:
    case CONTINUE_SESSION:
      api('get', '/api/auth/continue');
      break;
    case LOGIN:
      api('post', '/api/auth/login', action.data);
      break;
    case SIGNUP:
      api('post', '/api/auth/login', action.data);
      break;
    case LOGOUT:
      api('get', '/api/auth/logout');
      break;
  }
};

export default apiService;

// ---------------- Action Creators -----------------------

export function continueSession() {
  return {
    type: CONTINUE_SESSION,
  };
}

export function signup(formData) {
  return {
    type: SIGNUP,
    formData,
  };
}

export function login(formData) {
  return {
    type: LOGIN,
    formData,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}
