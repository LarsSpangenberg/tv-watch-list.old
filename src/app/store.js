import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import userReducer from './modules/user';
import showsList from './modules/showslist';
import apiService from './middleware/api-service';

const rootReducer = combineReducers({
  user: userReducer,
  shows: showsList,
});

const store = createStore(
  rootReducer,
  applyMiddleware(apiService, logger),
);

export default store;
