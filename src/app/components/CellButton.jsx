import React from 'react';
import PropTypes from 'prop-types';

function CellButton({ name, operation, handleIncDec }) {
  return (
    <button name={name} type="button" value={operation} onClick={handleIncDec}>
      <i className={`fas fa-${operation}`} />
    </button>
  );
}
CellButton.propTypes = {
  name: PropTypes.string.isRequired,
  operation: PropTypes.string.isRequired,
  handleIncDec: PropTypes.func.isRequired,
};

export default CellButton;
