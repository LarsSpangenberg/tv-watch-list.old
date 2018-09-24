
const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);

export default capitalize;

export const formatHeader = (name) => {
  let capitalized = capitalize(name);
  if (name === 'comment') {
    capitalized += 's';
  }
  return capitalized;
};
