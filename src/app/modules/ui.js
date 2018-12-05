import columns from 'utils/hideableColumns';

const TOGGLE_LIST_COLUMN = 'tv-watch-list/ui/TOGGLE_LIST_COLUMN';
const SHOW_ALL_COLUMNS = 'tv-watch-list/ui/SHOW_ALL_COLUMNS';

const defaultState = {
  hiddenListColumns: [],
};


// ----------------------- Reducer ---------------------------

const ui = (state = defaultState, action) => {
  switch (action.type) {
    case TOGGLE_LIST_COLUMN: {
      const index = state.hiddenListColumns.indexOf(action.name);
      const hiddenColumns = [...state.hiddenListColumns];
      return {
        ...state,
        hiddenListColumns: index === -1
          ? [...hiddenColumns, action.name]
          : [...hiddenColumns.slice(0, index), ...hiddenColumns.slice(index + 1)],
      };
    }
    case SHOW_ALL_COLUMNS:
      return {
        ...state,
        hiddenListColumns: [],
      };
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

export const showAll = () => ({
  type: SHOW_ALL_COLUMNS,
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
