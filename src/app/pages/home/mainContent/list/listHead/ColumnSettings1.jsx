import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import columns from 'utils/hideableColumns';
import { formatHeader } from 'utils/capitalizeWord';

import SimpleDropdownComponent from 'components/SimpleDropdownComponent';

import styles from './ColumnSettings.scss';

const ColumnSettings = ({ isHidden, toggleColumn }) => {
  const dropdownItems = columns.map((header) => {
    const hiddenIcon = isHidden(header) ? <i className="fas fa-eye-slash" /> : '';
    return (
      <li key={`list_header_settings_${header}`}>
        <button
          type="button"
          value={header}
          onClick={toggleColumn}
          className={isHidden(header) ? styles.hidden : ''}
        >
          <span className={styles.buttonText}>
            {formatHeader(header)}
          </span>
          <div className={styles.iconWrapper}>
            {hiddenIcon}
          </div>
        </button>
      </li>
    );
  });

  return (
    <Fragment>
      {dropdownItems}
    </Fragment>
  );
};

ColumnSettings.propTypes = {
  isHidden: PropTypes.func.isRequired,
  toggleColumn: PropTypes.func.isRequired,
};

const placeholder = <i className="far fa-eye" />;
export default SimpleDropdownComponent(ColumnSettings, 'th', placeholder);
