import lowerCaseArray from './lowerCaseArray';


const queryArray = (array, query, alreadyUsed) => {
  const escapedValue = query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'); // eslint-disable-line
  const regex = new RegExp(`^${escapedValue}`, 'i');
  return array.sort().filter((el) => {
    let notUsed = true;
    if (alreadyUsed) {
      notUsed = lowerCaseArray(alreadyUsed).indexOf(el.toLowerCase()) === -1;
    }
    // const sameAsVal = el.toLowerCase() === query.toLowerCase();
    return (regex.test(el) && notUsed);
  });
};

export default queryArray;

export const findMatch = (array, query) => (
  array.find(el => el.toLowerCase() === query.toLowerCase())
);
