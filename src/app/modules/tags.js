import { combineReducers } from 'redux';

import dynamicSort from 'utils/dynamicSort';

import byId, * as tag from './tags/byId';
import createList, * as list from './tags/createList';


// ----------------------- Reducer ---------------------------

const tagList = combineReducers({
  all: createList('all'),
  active: createList('active'),
  inactive: createList('inactive'),
});

const tags = combineReducers({
  byId,
  tagList,
});

export default tags;


// ------------------------- Selectors ----------------------

export const getFullySortedTags = (state, property, order, byActive) => {
  let result;
  let sortKey;

  if (order === 'desc') {
    sortKey = `-${property}`;
  } else {
    sortKey = property;
  }

  const sortedTags = idsArray => (
    idsArray.map(id => tag.getTag(state.byId, id)).sort(dynamicSort(sortKey))
  );

  if (byActive) {
    const activeIds = list.getIds(state.tagList.active);
    const inactiveIds = list.getIds(state.tagList.inactive);
    const sortedActive = sortedTags(activeIds);
    const sortedInactive = sortedTags(inactiveIds);
    if (byActive === 'active') {
      result = [...sortedActive, ...sortedInactive];
    } else {
      result = [...sortedInactive, ...sortedActive];
    }
  } else {
    const ids = list.getIds(state.tagList.all);
    result = sortedTags(ids);
  }
  return result;
};

export const getTagNames = (state, listName) => {
  const ids = list.getIds(state.tagList[listName]);
  return ids.map(id => tag.getTagName(state.byId, id));
};

export const getNumberOfTags = state => (
  list.getNumberOfIds(state.tagList.all)
);
