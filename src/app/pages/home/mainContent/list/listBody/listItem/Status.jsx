import React from 'react';
import PropTypes from 'prop-types';

function Status({ styleClass, status }) {
  return (
    <td className={styleClass}>
      <select name="status" defaultValue="current">
        <option value="current">current</option>
        <option value="completed">completed</option>
        <option value="watch later">watch later</option>
        <option value="dropped">dropped</option>
      </select>
    </td>
  );
}

Status.propTypes = {
  styleClass: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default Status;
