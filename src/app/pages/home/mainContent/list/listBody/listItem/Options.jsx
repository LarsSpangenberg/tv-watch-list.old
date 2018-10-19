import React from 'react';
import PropTypes from 'prop-types';

import styles from './Options.scss';

const Options = ({ addShow, removeShow }) => (
  <td className={styles.options}>
    <div className={styles.cellButtons}>

      <button type="button" className={styles.move}>
        <i className="fas fa-chevron-up" />
      </button>

      <button
        className={styles.removeShow}
        type="button"
        onClick={removeShow}
      >
        <i className="fas fa-minus" />
      </button>

      <div className={styles.hoverArea}>
        <div className={styles.addWrapper}>
          <button
            className={styles.addShow}
            type="button"
            onClick={addShow}
          >
            <i className="fas fa-plus" />
          </button>
        </div>
      </div>

      <button type="button" className={styles.move}>
        <i className="fas fa-chevron-down" />
      </button>
    </div>
  </td>
);


Options.propTypes = {
  addShow: PropTypes.func.isRequired,
  removeShow: PropTypes.func.isRequired,
};

export default Options;
