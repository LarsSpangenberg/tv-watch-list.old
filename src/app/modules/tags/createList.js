import { combineReducers } from 'redux';
// import userObj from 'assets/user.json';
// import showItem, * as tag from './tag';

const FETCH_TAGS_REQUEST = 'tv-watch-list/tags/FETCH_TAGS_REQUEST';
const UPDATE_TAG_REQUEST = 'tv-watch-list/tags/UPDATE_TAG_REQUEST';
const FETCH_TAGS_FAILURE = 'tv-watch-list/tags/FETCH_TAGS_FAILURE';
const UPDATE_TAG_FAILURE = 'tv-watch-list/tags/UPDATE_TAG_FAILURE';
export const FETCH_TAGS_SUCCESS = 'tv-watch-list/tags/FETCH_TAGS_SUCCESS';
export const ADD_TAG_SUCCESS = 'tv-watch-list/tags/ADD_TAG_SUCCESS';
export const REMOVE_TAG_SUCCESS = 'tv-watch-list/tags/REMOVE_TAG_SUCCESS';
export const TOGGLE_ACTIVE_SUCCESS = 'tv-watch-list/tags/TOGGLE_ACTIVE_SUCCESS';


// ----------------------- Reducer ---------------------------

const createList = (filter) => {
  const handleFilter = (isActive) => {
    if (
      (filter === 'active' && isActive)
      || (filter === 'inactive' && !isActive)
      || filter === 'all'
    ) {
      return true;
    }
    return false;
  };

  const ids = (state = [], action) => {
    switch (action.type) {
      case FETCH_TAGS_SUCCESS: {
        const nextState = [];
        action.result.forEach((tag) => {
          if (handleFilter(tag.active)) nextState.push(tag._id);
        });
        return nextState;
      }
      case ADD_TAG_SUCCESS:
        return handleFilter(action.result.active)
          ? [action.result._id, ...state]
          : state;
      case REMOVE_TAG_SUCCESS: {
        const index = state.indexOf(action.id);
        if (index === -1) return state;
        return [...state.slice(0, index), ...state.slice(index + 1)];
      }
      case TOGGLE_ACTIVE_SUCCESS: {
        const { _id } = action.result;
        const index = state.indexOf(_id);
        if (filter !== 'all') {
          if (index === -1) return [...state, _id];
          return [...state.slice(0, index), ...state.slice(index + 1)];
        }
        return state;
      }
      default:
        return state;
    }
  };

  const isFetching = (state = false, action) => {
    switch (action.type) {
      case FETCH_TAGS_REQUEST:
      case UPDATE_TAG_REQUEST:
        return true;
      case ADD_TAG_SUCCESS:
      case REMOVE_TAG_SUCCESS:
      case FETCH_TAGS_SUCCESS:
      case TOGGLE_ACTIVE_SUCCESS:
      case FETCH_TAGS_FAILURE:
      case UPDATE_TAG_FAILURE:
        return false;
      default:
        return state;
    }
  };

  const errorMessage = (state = null, action) => {
    switch (action.type) {
      case FETCH_TAGS_FAILURE:
      case UPDATE_TAG_FAILURE:
        return action.errors;
      case UPDATE_TAG_REQUEST:
      case FETCH_TAGS_REQUEST:
      case ADD_TAG_SUCCESS:
      case REMOVE_TAG_SUCCESS:
      case FETCH_TAGS_SUCCESS:
      case TOGGLE_ACTIVE_SUCCESS:
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

export const fetchTags = () => ({
  types: [FETCH_TAGS_REQUEST, FETCH_TAGS_SUCCESS, FETCH_TAGS_FAILURE],
  request: new Request('/api/tags/init', {
    method: 'GET',
  }),
});

export const addTag = tag => ({
  types: [UPDATE_TAG_REQUEST, ADD_TAG_SUCCESS, UPDATE_TAG_FAILURE],
  request: new Request('/api/tags/create', {
    method: 'POST',
    headers: { 'Content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ tag }),
  }),
});

export const removeTag = id => ({
  types: [UPDATE_TAG_REQUEST, REMOVE_TAG_SUCCESS, UPDATE_TAG_FAILURE],
  request: new Request('/api/tags/remove', {
    method: 'PUT',
    headers: { 'Content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ id }),
  }),
  id,
});

export const toggleActive = id => ({
  types: [UPDATE_TAG_REQUEST, TOGGLE_ACTIVE_SUCCESS, UPDATE_TAG_FAILURE],
  request: new Request('/api/tags/active', {
    method: 'POST',
    headers: { 'Content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ id }),
  }),
});


// ------------------------- Selectors ----------------------

export const getIds = state => state.ids;
export const getIsFetching = state => state.isFetching;
export const getErrorMessage = state => state.errorMessage;
export const getNumberOfIds = state => state.ids.length;
