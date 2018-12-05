import { combineReducers } from 'redux';
// import userObj from 'assets/user.json';
// import showItem, * as show from './show';
// import { camelCase } from 'utils/capitalizeWord';
// import dynamicSort from 'utils/dynamicSort';
import byId, * as show from './shows/byId';
import sortedList, * as list from './shows/sortedList';
import sortOrder, * as sort from './shows/sortOrder';
import updateTracker, * as tracker from './shows/updateTracker';


// ----------------------- Reducer ---------------------------

const orderedList = combineReducers({
  last: sortedList('last'),
  custom: sortedList('custom'),
});

const shows = combineReducers({
  byId,
  orderedList,
  sortOrder,
  tracker: updateTracker,
});

export default shows;

// ------------------------- Selectors ----------------------

const getListName = (state) => {
  const order = sort.getActiveSort(state.sortOrder);
  return order === 'custom' ? 'custom' : 'last';
};

export const getVisibleShows = (state, status, tags) => {
  const listName = getListName(state);
  const ids = list.getIds(state.orderedList[listName]);
  const visibleShows = [];

  ids.forEach((id) => {
    const showObj = show.getShow(state.byId, id);
    let isVisible = false;
    if (status === show.status || status === 'all') {
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
    }
  });
  return visibleShows;
};

export const getSortOrder = state => sort.getActiveSort(state.sortOrder);

export const getIsFetching = state => (
  list.getIsFetching(state.orderedList[getListName(state)])
);

export const getShowIds = state => (
  list.getIds(state.orderedList[getListName(state)])
);

export const getShowIndex = (state, id) => (
  list.getIds(state.orderedList[getListName(state)]).indexOf(id)
);

export const getNumberOfShows = state => (
  list.getNumberOfIds(state.orderedList.last)
);

export const getShowTags = (state, id) => (
  show.getShowTags(state.byId, id)
);

export const getLastAdded = state => (
  tracker.getLastAdded(state.tracker)
);

// ---------------------- action creators ---------------------
