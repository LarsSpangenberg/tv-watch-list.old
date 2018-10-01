import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import user, * as handleUser from 'modules/user';
import shows, * as handleShows from 'modules/shows';
import status, * as handleStatus from 'modules/status';
import tags, * as handleTags from 'modules/tags';
import ui, * as handleUi from 'modules/ui';

import apiService from './middleware/api-service';

const rootReducer = combineReducers({
  user,
  shows,
  status,
  tags,
  ui,
});

const store = createStore(
  rootReducer,
  applyMiddleware(apiService, logger),
);

export default store;

// ======================= Selectors ================================

// User -------------------------------------------------------------

export const getSignedIn = state => handleUser.getSignedIn(state.user);

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

// Tags ------------------------------------------------------------

export const getSortedTags = (state, ...args) => (
  handleTags.getFullySortedTags(state.tags, ...args)
);

export const getActiveTags = state => (
  handleTags.getActiveTagNames(state.tags)
);

export const getNumberOfTags = state => (
  handleTags.getNumberOfTags(state.tags)
);

// UI ---------------------------------------------------------------

export const isColumnHidden = (state, name) => (
  handleUi.isColumnHidden(state.ui, name)
);

export const getNumberOfHiddenColumns = state => (
  handleUi.getNumberOfHiddenColumns(state.ui)
);
