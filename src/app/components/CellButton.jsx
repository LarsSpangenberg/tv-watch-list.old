import React from 'react';
import PropTypes from 'prop-types';

function CellButton({
  name,
  operation,
  clickHandler,
  mouseDown,
}) {
  return (
    <button
      name={name}
      type="button"
      value={operation}
      onClick={clickHandler}
      onMouseDown={mouseDown}
    >
      <i className={`fas fa-${operation}`} />
    </button>
  );
}
CellButton.propTypes = {
  name: PropTypes.string.isRequired,
  operation: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
  mouseDown: PropTypes.func,
};

CellButton.defaultProps = {
  mouseDown: () => null,
};

export default CellButton;
