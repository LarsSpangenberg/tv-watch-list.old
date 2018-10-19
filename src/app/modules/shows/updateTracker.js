// import userObj from 'assets/user.json';
import {
  ADD_SHOW_SUCCESS,
  UPDATE_SHOW_SUCCESS,
  REMOVE_SHOW_SUCCESS,
} from './createList';

const defaultState = {
  lastAdded: '',
  lastUpdated: '',
  lastRemoved: '',
};

// ----------------------- Reducer ---------------------------

const updateTracker = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_SHOW_SUCCESS:
      return {
        ...state,
        lastAdded: action.result._id,
      };
    case UPDATE_SHOW_SUCCESS:
      return {
        ...state,
        lastUpdated: action.result._id,
      };
    case REMOVE_SHOW_SUCCESS:
      return {
        ...state,
        lastRemoved: action.result,
      };
    default:
      return state;
  }
};

export default updateTracker;

// ------------------------- Selectors ----------------------

export const getLastAdded = state => state.lastAdded;
export const getLastRemoved = state => state.lastRemoved;
export const getLastUpdated = state => state.lastUpdated;
