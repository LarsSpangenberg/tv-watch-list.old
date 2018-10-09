import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import SimpleDropdownComponent from 'components/SimpleDropdownComponent';

import { allStatuses } from 'utils/statusArray';
import { formatSpacedOutWords } from 'utils/capitalizeWord';
// import styles from './Status.scss';

const Status = ({
  status,
  clickHandler,
  closeDropdown,
}) => {
  function handleClick(e) {
    clickHandler(e);
    closeDropdown();
  }

  const buttons = allStatuses.filter(stat => (
    stat !== status
  )).map((stat, i) => (
    <li key={`sidebar_left_status_${stat}`}>
      <button
        type="button"
        name="status"
        value={stat}
        onClick={handleClick}
      >
        {formatSpacedOutWords(stat)}
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
          onClick={closeDropdown}
        >
          {formatSpacedOutWords(status)}
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
};

export default SimpleDropdownComponent(Status, 'div');
