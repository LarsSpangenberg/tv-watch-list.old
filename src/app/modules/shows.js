import { combineReducers } from 'redux';
// import userObj from 'assets/user.json';
// import showItem, * as show from './show';
import byId, * as show from './shows/byId';
import createList, * as list from './shows/createList';


// ----------------------- Reducer ---------------------------

const listByStatus = combineReducers({
  all: createList('all'),
  current: createList('current'),
  completed: createList('completed'),
  watchLater: createList('watch later'),
  dropped: createList('dropped'),
});

const shows = combineReducers({
  byId,
  listByStatus,
});

export default shows;

// ------------------------- Selectors ----------------------

export const getShowsbyStatus = (state, status) => {
  const ids = list.getIds(state.listByStatus[status]);
  return ids.map(id => show.getShow(state.byId, id));
};

export const getIsFetchingbyStatus = (state, status) => (
  list.getIsFetching(state.listByStatus[status])
);

export const getAllIds = state => (
  list.getIds(state.listByStatus.all)
);

export const getShowIndexFromAll = (state, id) => (
  list.getIds(state.listByStatus.all).indexOf(id)
);

// ---------------------- action creators ---------------------

// ---------------- api request action creators -----------------------
// types array needs REQUEST, SUCCESS, FAILURE types for the corresponding
// actions in that order. Optional 4th type for 204 status.

// export const initShows = () => ({
//   types: [REQUEST_SHOWS, INIT_SHOWS, REQUEST_FAILED],
//   request: new Request('/api/shows/init', {
//     method: 'GET',
//   }),
// });
//
// export const addShow = () => ({
//   types: [REQUEST_SHOWS, ADD_SHOW, REQUEST_FAILED],
//   request: new Request('/api/shows/create', {
//     method: 'GET',
//   }),
// });
