import React from 'react';
import PropTypes from 'prop-types';


function Title({ styleClass, title, handleChange }) {
  return (
    <td className={styleClass}>
      <div
        name="title"
        type="text"
        data-text="New Show"
        data-name="title"
        onInput={handleChange}
        contentEditable
        suppressContentEditableWarning
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
