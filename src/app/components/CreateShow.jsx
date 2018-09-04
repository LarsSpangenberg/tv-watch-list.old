import React from 'react';
import PropTypes from 'prop-types';

function CreateShow({ name, operation, createShow }) {
  return (
    <button type="button" onClick={createShow}>
      <i className="fas fa-plus" />
    </button>
  );
}
CreateShow.propTypes = {
  name: PropTypes.string.isRequired,
  operation: PropTypes.string.isRequired,
  createShow: PropTypes.func.isRequired,
};

export default CreateShow;
