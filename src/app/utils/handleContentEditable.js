
const handleContentEditable = (domNode) => {
  const range = document.createRange();
  range.selectNodeContents(domNode);
  range.collapse(false);
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
};

export default handleContentEditable;
