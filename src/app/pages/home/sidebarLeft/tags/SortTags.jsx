import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import SimpleDropdownComponent from 'components/SimpleDropdownComponent';

import styles from './SortTags.scss';

const SortTags = ({
  clickHandler,
  sortBy,
  sortOrder,
  topTags,
}) => {
  function setActive(name, order) {
    if (
      (sortBy === name && sortOrder === order)
      || (!order && name === topTags)
    ) {
      return styles.active;
    }
    return null;
  }

  return (
    <Fragment>
      <li className={styles.header}>
        Sort Tags:
      </li>

      <li className={styles.alphabetical}>
        <button
          className={setActive('name', 'asc')}
          type="button"
          name="alphabetical"
          value="asc"
          onClick={clickHandler}
        >
          <i className="fas fa-sort-alpha-down" />
        </button>
        <button
          className={setActive('name', 'desc')}
          type="button"
          name="alphabetical"
          value="desc"
          onClick={clickHandler}
        >
          <i className="fas fa-sort-alpha-up" />
        </button>
      </li>


      <li>
        <button
          className={setActive('dateAdded', 'desc')}
          type="button"
          name="dateAdded"
          value="desc"
          onClick={clickHandler}
        >
          most recent
        </button>
      </li>

      <li>
        <button
          className={setActive('dateAdded', 'asc')}
          type="button"
          name="dateAdded"
          value="asc"
          onClick={clickHandler}
        >
          oldest
        </button>
      </li>

      <hr />

      <li>
        <button
          className={setActive('active')}
          type="button"
          name="active"
          onClick={clickHandler}
        >
          active
        </button>
      </li>

      <li>
        <button
          className={setActive('inactive')}
          type="button"
          name="inactive"
          onClick={clickHandler}
        >
          inactive
        </button>
      </li>
    </Fragment>
  );
};

SortTags.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired,
  sortOrder: PropTypes.string.isRequired,
  topTags: PropTypes.string.isRequired,
};

const placeholder = <i className="fas fa-sort-alpha-down" />;
export default SimpleDropdownComponent(SortTags, 'div', placeholder);
