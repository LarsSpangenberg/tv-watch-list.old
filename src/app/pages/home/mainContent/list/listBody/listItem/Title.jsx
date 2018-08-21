import React from 'react';
import PropTypes from 'prop-types';


function Title({ styleClass, title, handleChange }) {
  return (
    <td className={styleClass}>
      <div
        contentEditable="true"
        name="title"
        type="text"
        onChange={handleChange}
      >
        {title}
      </div>
    </td>
  );
}

Title.propTypes = {
  styleClass: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Title;
