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
  const ids = (state = [], action) => {
    if (action.status !== status && status !== 'all') {
      return state;
    }
    switch (action.type) {
      case FETCH_SHOWS_SUCCESS:
        return action.result.map(show => show._id);
      case ADD_SHOW_SUCCESS: {
        const { index } = action;
        return [
          ...state.slice(0, index),
          action.result._id,
          ...state.slice(index),
        ];
      }
      case REMOVE_SHOW_SUCCESS: {
        const index = state.indexOf(action.id);
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
    if (action.status !== status && status !== 'all') {
      return state;
    }
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
    if (action.status !== status && status !== 'all') {
      return state;
    }
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

export const addShow = (status, tags, index) => ({
  types: [UPDATE_SHOW_REQUEST, ADD_SHOW_SUCCESS, UPDATE_SHOW_FAILURE],
  request: new Request('/api/shows/create', {
    method: 'POST',
    headers: { 'Content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ status, tags, index }),
  }),
  status,
  tags,
  index,
});

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
