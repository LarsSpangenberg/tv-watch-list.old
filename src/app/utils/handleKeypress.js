
const handleKeypress = (keycode, options) => {
  if (keycode === 13) {
    options.submit();
  } else if (keycode === 27) {
    options.esc();
  } else if (keycode === 9) {
    options.tab();
  }
};

export default handleKeypress;

export const handleCursor = (keycode, cursor, length) => {
  let newIndex = cursor;
  if (keycode === 38) {
    newIndex = cursor === 0 ? length - 1 : cursor - 1;
  } else if (keycode === 40) {
    newIndex = cursor === length - 1 ? 0 : cursor + 1;
  }
  return newIndex;
};
