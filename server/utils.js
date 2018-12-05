
const dynamicSort = (property) => {
  let sortorder = 1;
  let prop = property;
  if (property[0] === '-') {
    sortorder = -1;
    prop = property.substr(1);
  }

  return (a, b) => {
    let result;
    if (a[prop] < b[prop]) {
      result = -1;
    } else if (a[prop] > b[prop]) {
      result = 1;
    } else result = 0;
    return result * sortorder;
  };
};

exports.sortShows = (order) => {
  let sortKey;
  switch (order) {
    case 'alphabetical':
      sortKey = 'title';
      break;
    case 'z to a':
      sortKey = '-title';
      break;
    case 'most recent':
      sortKey = '-dateAdded';
      break;
    case 'oldest':
    default:
      sortKey = 'dateAdded';
      break;
  }
  return dynamicSort(sortKey);
};
