import {
  ADD_TAG_SUCCESS,
  FETCH_TAGS_SUCCESS,
  TOGGLE_ACTIVE_SUCCESS,
  REMOVE_TAG_SUCCESS,
} from './createList';
// const ADD_TAG_SUCCESS = 'tv-watch-list/tags/ADD_TAG_SUCCESS';

// ----------------------- Reducer ---------------------------

const byId = (state = {}, action) => {
  switch (action.type) {
    case FETCH_TAGS_SUCCESS: {
      const nextState = { ...state };
      action.result.forEach((tag) => {
        nextState[tag._id] = tag;
      });
      return nextState;
    }
    case ADD_TAG_SUCCESS:
    case TOGGLE_ACTIVE_SUCCESS:
      return {
        ...state,
        [action.result._id]: action.result,
      };
    case REMOVE_TAG_SUCCESS: {
      const nextState = { ...state };
      delete nextState[action.id];
      return nextState;
    }
    default:
      return state;
  }
};

export default byId;

// ---------------------- Selectors ---------------------------------

export const getTag = (state, id) => state[id];
export const getTagName = (state, id) => state[id].name;
