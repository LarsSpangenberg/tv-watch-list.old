const CHANGE_STATUS = 'tv-watch-list/status/CHANGE_STATUS';

// ----------------------- Reducer ---------------------------

const status = (state = 'all', action) => {
  switch (action.type) {
    case CHANGE_STATUS:
      return action.status;
    default:
      return state;
  }
};

export default status;

// ---------------------- action creators ---------------------

export const changeStatus = value => ({
  type: CHANGE_STATUS,
  status: value,
});


// ---------------------- Selectors ---------------------------------

export const getActiveStatus = state => state;
