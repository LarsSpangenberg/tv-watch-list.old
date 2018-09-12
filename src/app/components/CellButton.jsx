import React from 'react';
import PropTypes from 'prop-types';

function CellButton({ name, operation, clickHandler }) {
  return (
    <button name={name} type="button" value={operation} onClick={clickHandler}>
      <i className={`fas fa-${operation}`} />
    </button>
  );
}
CellButton.propTypes = {
  name: PropTypes.string.isRequired,
  operation: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
};

export default CellButton;
