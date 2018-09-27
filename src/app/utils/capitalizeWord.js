
const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);

export default capitalize;

export const formatHeader = (name) => {
  let capitalized = capitalize(name);
  if (name === 'comment') {
    capitalized += 's';
  }
  return capitalized;
};

export const formatSpacedOutWords = (str) => {
  let newStr;
  if (/\s/g.test(str)) {
    newStr = str.split(' ').map(word => capitalize(word)).join(' ');
  } else {
    newStr = capitalize(str);
  }
  return newStr;
};
