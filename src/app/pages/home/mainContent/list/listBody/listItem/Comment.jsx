import React from 'react';
import PropTypes from 'prop-types';

function Comment({ styleClass, comments, handleChange }) {
  return (
    <td className={styleClass}>
      <div
        name="comments"
        type="text"
        data-name="comments"
        onInput={handleChange}
        contentEditable
        suppressContentEditableWarning
      >
        {comments}
      </div>
    </td>
  );
}

Comment.propTypes = {
  styleClass: PropTypes.string.isRequired,
  comments: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Comment;
