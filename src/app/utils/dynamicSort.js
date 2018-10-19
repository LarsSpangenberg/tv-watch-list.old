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

export default dynamicSort;

export const dynamicSortBool = (property) => {
  let sortorder = 1;
  let prop = property;
  if (property[0] === '-') {
    sortorder = -1;
    prop = property.substr(1);
  }

  return (a, b) => {
    let result;
    if (a[prop] === b[prop]) {
      result = 0;
    } else if (a[prop]) {
      result = -1;
    } else result = 1;
    return result * sortorder;
  };
};
