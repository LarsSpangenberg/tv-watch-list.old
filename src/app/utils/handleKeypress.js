
const handleKeypress = (keycode, options) => {
  const {
    submit,
    esc,
    tab,
    escOnTab,
  } = options;
  if (keycode === 13) {
    submit();
  } else if (keycode === 27) {
    esc();
  } else if (keycode === 9) {
    if (escOnTab) {
      esc();
    } else {
      tab();
    }
  }
};

export default handleKeypress;

export const handleCursor = (keycode, cursor, arrayLength) => {
  let newIndex = cursor;
  if (keycode === 38) {
    newIndex = cursor === 0 ? arrayLength - 1 : cursor - 1;
  } else if (keycode === 40) {
    newIndex = cursor === arrayLength - 1 ? 0 : cursor + 1;
  }
  return newIndex;
};

export const navigateDropdown = (keycode, container, focusClass) => {
  const {
    childElementCount,
    firstChild,
    lastChild,
  } = container;
  if (childElementCount <= 1) return;
  const focus = document.getElementsByClassName(focusClass)[0];
  const li = focus.parentNode;
  let nextLi;

  if (keycode === 38) {
    nextLi = li.previousSibling || lastChild;
  } else if (keycode === 40) {
    nextLi = li.nextSibling || firstChild;
  } else if (keycode === 13) {
    nextLi = firstChild;
  } else {
    return;
  }
  nextLi.firstChild.classList.add(focusClass);
  focus.classList.remove(focusClass);
};

export const handleClose = (keycode, options) => {
  const {
    esc,
    tab,
    escOnTab,
  } = options;
  if (keycode === 27) {
    esc();
  } else if (keycode === 9) {
    if (escOnTab) {
      esc();
    } else {
      tab();
    }
  }
};

export const handleEnter = (keycode, submit) => {
  if (keycode === 13) {
    submit();
  }
};
