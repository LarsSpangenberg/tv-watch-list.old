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
export const CHANGE_SORT_ORDER_SUCCESS = 'tv-watch-list/sortOrder/CHANGE_SORT_ORDER_SUCCESS';

// ----------------------- Reducer ---------------------------


const sortedList = (listName) => {
  const ids = (state = [], action) => {
    // const swap = (x, y) => {
    //   const arr = [...state];
    //   [arr[x], arr[y]] = [arr[y], arr[x]];
    //   return arr;
    // };

    const checkListName = order => (
      order === listName
      || (listName !== 'custom' && order !== 'custom')
    );

    switch (action.type) {
      case FETCH_SHOWS_SUCCESS: {
        const { order, lastOrder, customOrder } = action.result.sortShows;
        return order === 'custom' ? customOrder : lastOrder;
      }
      case CHANGE_SORT_ORDER_SUCCESS:
        return checkListName(action.order) ? action.result.ids : state;
      case ADD_SHOW_SUCCESS: {
        const i = checkListName(action.order) ? action.index : state.length;
        return [...state.slice(0, i), action.result._id, ...state.slice(i)];
      }
      case REMOVE_SHOW_SUCCESS: {
        const index = state.indexOf(action.id);
        if (index === -1) return state;
        return [...state.slice(0, index), ...state.slice(index + 1)];
      }
      case UPDATE_SHOW_SUCCESS:
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

export default sortedList;

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

export const addShow = (parameters) => {
  const { status, ...rest } = parameters;
  const params = {
    status: status === 'all' ? 'current' : status,
    ...rest,
  };
  return {
    types: [UPDATE_SHOW_REQUEST, ADD_SHOW_SUCCESS, UPDATE_SHOW_FAILURE],
    request: new Request('/api/shows/create', {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=utf-8' },
      body: JSON.stringify(params),
    }),
    ...params,
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
