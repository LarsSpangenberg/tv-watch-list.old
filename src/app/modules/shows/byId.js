// import userObj from 'assets/user.json';
import {
  ADD_SHOW_SUCCESS,
  FETCH_SHOWS_SUCCESS,
  UPDATE_SHOW_SUCCESS,
  REMOVE_SHOW_SUCCESS,
} from './createList';

// const UPDATE_LIST_ITEM = 'tv-watch-list/show/UPDATE_LIST_ITEM';

// ----------------------- Reducer ---------------------------

const byId = (state = {}, action) => {
  switch (action.type) {
    case FETCH_SHOWS_SUCCESS: {
      const nextState = { ...state };
      action.result.forEach((show) => {
        nextState[show._id] = show;
      });
      return nextState;
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


// ---------------------- action creators ---------------------

// const handleChange = (id, key, value) => ({
//   type: UPDATE_LIST_ITEM,
//   id,
//   key,
//   value,
// });
//
// const handleIncDec = (id, key, operation) => ({
//
// });

// ---------------- api request action creators -----------------------
// types array needs REQUEST, SUCCESS, FAILURE types for the corresponding
// actions in that order. Optional 4th type for 204 status.

// ------------------------- Selectors ----------------------

export const getShow = (state, id) => state[id];
