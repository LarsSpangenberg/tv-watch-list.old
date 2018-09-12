import React from 'react';
import PropTypes from 'prop-types';

import CellButton from 'components/CellButton';

function Tags({ styleClass, tags }) {
  const tagList = tags.map(tag => (
    `<li>${tag}</li>`
  ));
  return (
    <td className={styleClass}>
      <ul>
        {tagList}
      </ul>
      <CellButton
        name="addTag"
        operation="plus"
      />
    </td>
  );
}

Tags.propTypes = {
  styleClass: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

export default Tags;
