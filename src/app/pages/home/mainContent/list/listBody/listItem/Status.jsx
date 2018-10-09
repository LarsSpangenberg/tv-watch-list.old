import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import SimpleDropdownComponent from 'components/SimpleDropdownComponent';

import styles from './Status.scss';

const Status = ({
  status,
  clickHandler,
  closeDropdown,
  generateWeakKey,
}) => {
  function handleClick(e) {
    clickHandler(e);
    closeDropdown();
  }

  const allStatuses = ['current', 'completed', 'watch later', 'on hold', 'dropped'];
  const buttons = allStatuses.filter(stat => (
    stat !== status
  )).map((stat, i) => (
    <li key={generateWeakKey(stat, i + 1)}>
      <button
        type="button"
        name="status"
        value={stat}
        onClick={handleClick}
      >
        {stat}
      </button>
    </li>
  ));

  return (
    <Fragment>
      <li key={generateWeakKey(status, 0)}>
        <button
          type="button"
          name="status"
          value={status}
          onClick={closeDropdown}
        >
          {status}
        </button>
      </li>
      {buttons}
    </Fragment>
  );
};


Status.propTypes = {
  status: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
  closeDropdown: PropTypes.func.isRequired,
  generateWeakKey: PropTypes.func.isRequired,
};

export default SimpleDropdownComponent(Status, 'td');
