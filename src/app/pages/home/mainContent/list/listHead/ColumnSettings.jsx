import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import SimpleDropdownComponent from 'components/SimpleDropdownComponent';

import styles from './ColumnSettings.scss';

const ColumnSettings = ({ hidden, showAll, styleClass }) => {
  let displayButton = null;
  if (hidden > 0) {
    displayButton = (
      <button
        type="button"
        onClick={showAll}
      >
        <i className="far fa-eye" />
      </button>
    );
  }
  return (
    <th className={styleClass}>
      {displayButton}
    </th>
  );
};

ColumnSettings.propTypes = {
  styleClass: PropTypes.string.isRequired,
  showAll: PropTypes.func.isRequired,
  hidden: PropTypes.number.isRequired,
};

export default ColumnSettings;
