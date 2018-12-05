import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import SimpleDropdownComponent from 'components/SimpleDropdownComponent';

import { capitalizeTitle } from 'utils/capitalizeWord';
// import styles from './Sort.scss';

const Sort = ({
  currentOrder,
  clickHandler,
  closeDropdown,
}) => {
  function handleClick(e) {
    clickHandler(e);
    closeDropdown();
  }

  const buttons = ['alphabetical', 'z to a', 'most recent', 'oldest', 'custom']
    .filter(sort => sort !== currentOrder).map((sort, i) => (
      <li key={`sidebar_left_sort_${sort}`}>
        <button
          type="button"
          name="sort"
          value={sort}
          onClick={handleClick}
        >
          {capitalizeTitle(sort)}
        </button>
      </li>
    ));

  return (
    <Fragment>
      <li key={`sidebar_left_sort_${currentOrder}`}>
        <button
          type="button"
          name="sort"
          value={currentOrder}
          onClick={closeDropdown}
        >
          {capitalizeTitle(currentOrder)}
        </button>
      </li>
      {buttons}
    </Fragment>
  );
};


Sort.propTypes = {
  currentOrder: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
  closeDropdown: PropTypes.func.isRequired,
};

export default SimpleDropdownComponent(Sort, 'div');
