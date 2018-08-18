import React from 'react';
import PropTypes from 'prop-types';

import styles from './SidebarLeft.scss';

export default class SidebarLeft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // isActive: false,
    };
  }

  render() {
    // const { isActive } = this.state;
    const { handleActive, isActive } = this.props;
    return (
      <aside className={`${styles.sidebar} ${isActive ? styles.active : ''}`}>
        <div className={styles.pulloutArea}>
          <button
            className={styles.pullout}
            onClick={handleActive}
            type="button"
          >
            <i className={isActive ? 'fas fa-chevron-left' : 'fas fa-list'} />
          </button>
        </div>
        <div className={styles.pulloutInner}>
          <div className={styles.brandBackdrop} />
          <div className={styles.lists}>
            <ul className={styles.standardLists}>
              <li>All</li>
              <li>Current</li>
              <li>Watch Later</li>
              <li>Completed</li>
            </ul>
            <div className={styles.listHeader}>
              <h2>Lists</h2>
              <button type="button" className={styles.addList}>
                <i className="fas fa-plus" />
              </button>
            </div>
            <ul className={styles.customLists}>
              <li>Favourites</li>
              <li>Movies</li>
              <li>Netflix Marvel</li>
              <li>Anime</li>
            </ul>
          </div>
        </div>
      </aside>
    );
  }
}
SidebarLeft.propTypes = {
  isActive: PropTypes.bool.isRequired,
  handleActive: PropTypes.func.isRequired,
};
