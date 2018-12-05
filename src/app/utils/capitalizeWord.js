
const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);

export default capitalize;

export const formatHeader = (name) => {
  let capitalized = capitalize(name);
  if (name === 'comment') {
    capitalized += 's';
  }
  return capitalized;
};

export const capitalizeTitle = (str) => {
  let newStr;
  const dontCapitalize = [
    'an',
    'and',
    'at',
    'but',
    'by',
    'for',
    'from',
    'the',
    'to',
  ];
  if (/\s/g.test(str)) {
    newStr = str.split(' ').map((word, i) => {
      if (
        i !== 0
        && i !== str.length - 1
        && dontCapitalize.includes(word)
      ) {
        return word;
      }
      return capitalize(word);
    }).join(' ');
  } else {
    newStr = capitalize(str);
  }
  return newStr;
};

export const camelCase = (str) => {
  let newStr;
  if (/\s/g.test(str)) {
    newStr = str.split(' ').map((word, i) => (
      i > 0 ? capitalize(word) : word.toLowerCase()
    )).join('');
  } else {
    newStr = str;
  }
  return newStr;
};
