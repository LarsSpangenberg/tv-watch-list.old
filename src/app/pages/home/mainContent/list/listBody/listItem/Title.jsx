import React from 'react';
import PropTypes from 'prop-types';


function Title({ styleClass, title, handleChange }) {
  return (
    <td className={styleClass}>
      <input
        name="title"
        type="text"
        value={title}
        onChange={handleChange}
      />
    </td>
  );
}

Title.propTypes = {
  styleClass: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Title;
