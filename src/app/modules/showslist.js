import userObj from 'assets/user.json';
import showItem, * as show from './show';

const ADD_SHOW = 'tv-watch-list/showList/ADD_SHOW';

// ----------------------- Reducer ---------------------------

export default function showsList(state = userObj.shows, action) {
  switch (action.type) {
    case ADD_SHOW:
      return [
        ...state,
        showItem(undefined, show.addShow()),
      ];
    default:
      return state;
  }
}

// ---------------------- action creators ---------------------

export const addShow = () => ({
  type: ADD_SHOW,
});
