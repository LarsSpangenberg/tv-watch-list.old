import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import SimpleDropdownComponent from 'components/SimpleDropdownComponent';

import styles from './Status.scss';

const Status = ({
  status,
  clickHandler,
}) => {
  const allStatuses = ['current', 'completed', 'watch later', 'on hold', 'dropped'];
  const buttons = allStatuses.filter(stat => (
    stat !== status
  )).map((stat, i) => (
    <li key={`sidebar_left_status_${stat}`}>
      <button
        type="button"
        name="status"
        value={stat}
        onClick={clickHandler}
      >
        {stat}
      </button>
    </li>
  ));

  return (
    <Fragment>
      <li key={`sidebar_left_status_${status}`}>
        <button
          type="button"
          name="status"
          value={status}
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
};

export default SimpleDropdownComponent(Status, 'div', 'status');
