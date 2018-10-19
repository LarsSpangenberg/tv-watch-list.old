import { combineReducers } from 'redux';
// import userObj from 'assets/user.json';
// import showItem, * as show from './show';

const FETCH_SHOWS_REQUEST = 'tv-watch-list/shows/FETCH_SHOWS_REQUEST';
const UPDATE_SHOW_REQUEST = 'tv-watch-list/shows/UPDATE_SHOW_REQUEST';
const FETCH_SHOWS_FAILURE = 'tv-watch-list/shows/FETCH_SHOWS_FAILURE';
const UPDATE_SHOW_FAILURE = 'tv-watch-list/shows/UPDATE_SHOW_FAILURE';
export const FETCH_SHOWS_SUCCESS = 'tv-watch-list/shows/FETCH_SHOWS_SUCCESS';
export const ADD_SHOW_SUCCESS = 'tv-watch-list/shows/ADD_SHOW_SUCCESS';
export const REMOVE_SHOW_SUCCESS = 'tv-watch-list/shows/REMOVE_SHOW_SUCCESS';
export const UPDATE_SHOW_SUCCESS = 'tv-watch-list/shows/UPDATE_SHOW_SUCCESS';


// ----------------------- Reducer ---------------------------

const createList = (status) => {
  const statusMatches = showStatus => (
    status === showStatus || status === 'all'
  );

  const ids = (state = [], action) => {
    switch (action.type) {
      case FETCH_SHOWS_SUCCESS: {
        const nextState = [];
        action.result.forEach((show) => {
          if (statusMatches(show.status)) {
            nextState.push(show._id);
          }
        });
        return nextState;
      }
      case ADD_SHOW_SUCCESS: {
        const i = action.index ? action.index : state.length;
        return statusMatches(action.result.status) ? [
          ...state.slice(0, i),
          action.result._id,
          ...state.slice(i),
        ] : state;
      }
      case UPDATE_SHOW_SUCCESS: {
        const index = state.indexOf(action.result._id);
        if (statusMatches(action.result.status) && index === -1) {
          return [...state, action.result._id];
        }
        if (!statusMatches(action.result.status) && index !== -1) {
          return [...state.slice(0, index), ...state.slice(index + 1)];
        }
        return state;
      }
      case REMOVE_SHOW_SUCCESS: {
        const index = state.indexOf(action.id);
        if (index === -1) return state;
        return [
          ...state.slice(0, index),
          ...state.slice(index + 1),
        ];
      }
      default:
        return state;
    }
  };

  const isFetching = (state = false, action) => {
    switch (action.type) {
      case FETCH_SHOWS_REQUEST:
      case UPDATE_SHOW_REQUEST:
        return true;
      case ADD_SHOW_SUCCESS:
      case REMOVE_SHOW_SUCCESS:
      case FETCH_SHOWS_SUCCESS:
      case UPDATE_SHOW_SUCCESS:
      case FETCH_SHOWS_FAILURE:
      case UPDATE_SHOW_FAILURE:
        return false;
      default:
        return state;
    }
  };

  const errorMessage = (state = null, action) => {
    switch (action.type) {
      case FETCH_SHOWS_FAILURE:
      case UPDATE_SHOW_FAILURE:
        return action.errors;
      case UPDATE_SHOW_REQUEST:
      case FETCH_SHOWS_REQUEST:
      case ADD_SHOW_SUCCESS:
      case REMOVE_SHOW_SUCCESS:
      case FETCH_SHOWS_SUCCESS:
      case UPDATE_SHOW_SUCCESS:
        return null;
      default:
        return state;
    }
  };

  return combineReducers({
    ids,
    isFetching,
    errorMessage,
  });
};

export default createList;

// ---------------------- action creators ---------------------
// ---------------- api request action creators -----------------------
// types array needs REQUEST, SUCCESS, FAILURE types for the corresponding
// actions in that order. Optional 4th type for 204 status.

export const fetchShows = () => ({
  types: [FETCH_SHOWS_REQUEST, FETCH_SHOWS_SUCCESS, FETCH_SHOWS_FAILURE],
  request: new Request('/api/shows/init', {
    method: 'GET',
  }),
});

export const addShow = (status, tags, index) => {
  const stat = status === 'all' ? 'current' : status;
  return {
    types: [UPDATE_SHOW_REQUEST, ADD_SHOW_SUCCESS, UPDATE_SHOW_FAILURE],
    request: new Request('/api/shows/create', {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ status: stat, tags, index }),
    }),
    status: stat,
    tags,
    index,
  };
};

export const removeShow = id => ({
  types: [UPDATE_SHOW_REQUEST, REMOVE_SHOW_SUCCESS, UPDATE_SHOW_FAILURE],
  request: new Request('/api/shows/remove', {
    method: 'PUT',
    headers: { 'Content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ id }),
  }),
  id,
});

export const updateShow = data => ({
  types: [UPDATE_SHOW_REQUEST, UPDATE_SHOW_SUCCESS, UPDATE_SHOW_FAILURE],
  request: new Request('/api/shows/update', {
    method: 'POST',
    headers: { 'Content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify(data),
  }),
});

// ------------------------- Selectors ----------------------

export const getIds = state => state.ids;
export const getIsFetching = state => state.isFetching;
export const getErrorMessage = state => state.errorMessage;
export const getNumberOfIds = state => state.ids.length;
