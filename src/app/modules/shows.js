import { combineReducers } from 'redux';
// import userObj from 'assets/user.json';
// import showItem, * as show from './show';
import { camelCase } from 'utils/capitalizeWord';
import byId, * as show from './shows/byId';
import createList, * as list from './shows/createList';


// ----------------------- Reducer ---------------------------

const listByStatus = combineReducers({
  all: createList('all'),
  current: createList('current'),
  completed: createList('completed'),
  watchLater: createList('watch later'),
  dropped: createList('dropped'),
  onHold: createList('on hold'),
});

const shows = combineReducers({
  byId,
  listByStatus,
});

export default shows;

// ------------------------- Selectors ----------------------

export const getShowsbyStatus = (state, status, tags) => {
  const ids = list.getIds(state.listByStatus[camelCase(status)]);
  const visibleShows = [];
  ids.forEach((id) => {
    const showObj = show.getShow(state.byId, id);
    let isVisible = false;
    console.log(showObj);
    if (tags.length > 0) {
      const containsActiveTag = tag => (
        showObj.tags.includes(tag) && !isVisible
      );
      if (tags.some(containsActiveTag)) {
        visibleShows.push(showObj);
        isVisible = true;
      }
    } else if (!isVisible) {
      visibleShows.push(showObj);
      isVisible = true;
    }
  });
  return visibleShows;
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

export const getNumberOfShows = (state, status) => (
  list.getNumberOfIds(state.listByStatus[status])
);

// ---------------------- action creators ---------------------
