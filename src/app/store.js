import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import user, * as handleUser from './modules/user';
import shows, * as handleShows from './modules/shows';
import apiService from './middleware/api-service';

const rootReducer = combineReducers({
  user,
  shows,
});

const store = createStore(
  rootReducer,
  applyMiddleware(apiService, logger),
);

export default store;

// ----------------------- Selectors ----------------------------

// User


// Shows
export const getVisibleShows = (state, status) => (
  handleShows.getShowsbyStatus(state.shows, status)
);

export const isListUpdating = (state, status) => (
  handleShows.getIsFetchingbyStatus(state.shows, status)
);

export const getShowIndexFromAll = (state, id) => (
  handleShows.getShowIndexFromAll(state.shows, id)
);
