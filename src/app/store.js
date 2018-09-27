import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import columns from 'utils/hideableColumns';

import user, * as handleUser from 'modules/user';
import shows, * as handleShows from 'modules/shows';
import status, * as handleStatus from 'modules/status';
import ui, * as handleUi from 'modules/ui';

import apiService from './middleware/api-service';

const rootReducer = combineReducers({
  user,
  shows,
  status,
  ui,
});

const store = createStore(
  rootReducer,
  applyMiddleware(apiService, logger),
);

export default store;

// ======================= Selectors ================================

// Shows -----------------------------------------------------------

export const getVisibleShows = (state, activeStatus) => (
  handleShows.getShowsbyStatus(state.shows, activeStatus)
);

export const isListUpdating = (state, activeStatus) => (
  handleShows.getIsFetchingbyStatus(state.shows, activeStatus)
);

export const getShowIndexFromAll = (state, id) => (
  handleShows.getShowIndexFromAll(state.shows, id)
);

// Status ----------------------------------------------------------

export const getActiveStatus = state => (
  handleStatus.getActiveStatus(state.status)
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
