const ADD_SHOW = 'tv-watch-list/show/ADD_SHOW';


// ----------------------- Reducer ---------------------------

export default function showItem(state, action) {
  switch (action.type) {
    case ADD_SHOW:
      return {
        ...state,
        id: '',
        title: '',
        current: {
          season: 1,
          episode: 1,
        },
        comments: '',
        status: '',
        tags: [],
        data: {},
      };
    default:
      return state;
  }
}

// ---------------------- action creators ---------------------

export const addShow = () => ({
  type: ADD_SHOW,
});
