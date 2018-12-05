import {
  FETCH_SHOWS_SUCCESS,
  CHANGE_SORT_ORDER_SUCCESS,
} from './sortedList';

const CHANGE_SORT_ORDER_REQUEST = 'tv-watch-list/sortOrder/CHANGE_SORT_ORDER_REQUEST';
const CHANGE_SORT_ORDER_FAILURE = 'tv-watch-list/sortOrder/CHANGE_SORT_ORDER_FAILURE';

// ----------------------- Reducer ---------------------------

const sortOrder = (state = 'most recent', action) => {
  switch (action.type) {
    case FETCH_SHOWS_SUCCESS:
      return action.result.sortShows.order;
    case CHANGE_SORT_ORDER_SUCCESS:
      return action.order;
    case CHANGE_SORT_ORDER_REQUEST:
    case CHANGE_SORT_ORDER_FAILURE:
    default:
      return state;
  }
};

export default sortOrder;

// ---------------------- action creators ---------------------

export const changeSortOrder = order => ({
  types: [CHANGE_SORT_ORDER_REQUEST, CHANGE_SORT_ORDER_SUCCESS, CHANGE_SORT_ORDER_FAILURE],
  request: new Request('/api/shows/sortOrder', {
    method: 'PUT',
    headers: { 'Content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ order }),
  }),
  order,
});


// ---------------------- Selectors ---------------------------------

export const getActiveSort = state => state;

export const getSortKey = (state) => {
  let sortKey;
  switch (state) {
    case 'custom':
      sortKey = 'custom';
      break;
    case 'alphabetical':
      sortKey = 'title';
      break;
    case 'z to a':
      sortKey = '-title';
      break;
    case 'oldest':
      sortKey = '-dateAdded';
      break;
    case 'most recent':
    default:
      sortKey = 'dateAdded';
      break;
  }
  return sortKey;
};
