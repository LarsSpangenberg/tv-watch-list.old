import React from 'react';
import PropTypes from 'prop-types';

function Comment({ styleClass, comments, handleChange }) {
  return (
    <td className={styleClass}>
      <input
        name="comments"
        type="text"
        value={comments}
        onChange={handleChange}
      />
    </td>
  );
}

Comment.propTypes = {
  styleClass: PropTypes.string.isRequired,
  comments: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Comment;
