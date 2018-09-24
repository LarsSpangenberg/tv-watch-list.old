import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import columns from 'utils/hideableColumns';

import user, * as handleUser from './modules/user';
import shows, * as handleShows from './modules/shows';
import ui, * as handleUi from './modules/ui';

import apiService from './middleware/api-service';

const rootReducer = combineReducers({
  user,
  shows,
  ui,
});

const store = createStore(
  rootReducer,
  applyMiddleware(apiService, logger),
);

export default store;

// ======================= Selectors ================================

// Shows -----------------------------------------------------------

export const getVisibleShows = (state, status) => (
  handleShows.getShowsbyStatus(state.shows, status)
);

export const isListUpdating = (state, status) => (
  handleShows.getIsFetchingbyStatus(state.shows, status)
);

export const getShowIndexFromAll = (state, id) => (
  handleShows.getShowIndexFromAll(state.shows, id)
);

// UI ---------------------------------------------------------------

export const isColumnHidden = (state, name) => {
  if (columns.indexOf(name) === -1) {
    console.log(`invalid name: ${name}`);
  }
  return handleUi.isColumnHidden(state.ui, name);
};

export const getNumberOfHiddenColumns = state => (
  handleUi.getNumberOfHiddenColumns(state.ui)
);
