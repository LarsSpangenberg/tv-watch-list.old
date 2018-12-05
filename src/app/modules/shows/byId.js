// import userObj from 'assets/user.json';
import {
  ADD_SHOW_SUCCESS,
  FETCH_SHOWS_SUCCESS,
  UPDATE_SHOW_SUCCESS,
  REMOVE_SHOW_SUCCESS,
} from './sortedList';
import { REMOVE_TAG_SUCCESS } from '../tags/createList';

// ----------------------- Reducer ---------------------------

const byId = (state = {}, action) => {
  switch (action.type) {
    case REMOVE_TAG_SUCCESS:
    case FETCH_SHOWS_SUCCESS: {
      const { shows } = action.result;
      // const nextState = { ...state };
      // const array = updatedShows || action.result;
      // array.forEach((show) => { nextState[show._id] = show; });
      return shows || state;
    }
    case ADD_SHOW_SUCCESS:
    case UPDATE_SHOW_SUCCESS:
      return {
        ...state,
        [action.result._id]: action.result,
      };
    case REMOVE_SHOW_SUCCESS: {
      const nextState = { ...state };
      delete nextState[action.id];
      return nextState;
    }
    default:
      return state;
  }
};

export default byId;

// ------------------------- Selectors ----------------------

export const getShow = (state, id) => state[id];
export const getShowTags = (state, id) => state[id].tags;
