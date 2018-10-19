import columns from 'utils/hideableColumns';

const TOGGLE_LIST_COLUMN = 'tv-watch-list/ui/TOGGLE_LIST_COLUMN';

const defaultState = {
  hiddenListColumns: [],
};


// ----------------------- Reducer ---------------------------

const ui = (state = defaultState, action) => {
  switch (action.type) {
    case TOGGLE_LIST_COLUMN: {
      const index = state.hiddenListColumns.indexOf(action.name);
      const columns = [...state.hiddenListColumns];
      return {
        ...state,
        hiddenListColumns: index === -1
          ? [...columns, action.name]
          : [...columns.slice(0, index), ...columns.slice(index + 1)],
      };
    }
    default:
      return state;
  }
};

export default ui;

// ---------------------- action creators ---------------------

export const toggleListColumn = name => ({
  type: TOGGLE_LIST_COLUMN,
  name,
});


// ---------------------- Selectors ---------------------------------

export const isColumnHidden = (state, name) => {
  if (columns.indexOf(name) === -1) {
    console.log(`invalid name: ${name}`);
  }
  return state.hiddenListColumns.indexOf(name) !== -1;
};

export const getNumberOfHiddenColumns = state => (
  state.hiddenListColumns.length
);
