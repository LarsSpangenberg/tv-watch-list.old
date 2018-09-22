import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import CreateOptionsCell from 'components/CreateOptionsCell';

const ColumnSettings = ({ addShow, removeShow }) => {
  const headers = ['Title', 'Season', 'Episode', 'Comments', 'Tags', 'Status'];
  const dropdownItems = headers.map(header => (
    <li key={header}>
      <button type="button">
        {header}
      </button>
    </li>
  ));

  return (
    <Fragment>
      {dropdownItems}
    </Fragment>
  );
};

ColumnSettings.propTypes = {
  addShow: PropTypes.func.isRequired,
  removeShow: PropTypes.func.isRequired,
};

export default CreateOptionsCell(ColumnSettings, 'th', 'far fa-eye');
