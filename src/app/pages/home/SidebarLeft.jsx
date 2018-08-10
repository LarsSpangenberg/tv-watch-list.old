import React from 'react';

import styles from './SidebarLeft.scss';

function SidebarLeft(props) {
  return (
    <aside className={styles.sidebar}>
      <ul>
        <li>All</li>
        <li>currently watching</li>
        <li>watch later</li>
        <li>completed</li>
      </ul>
      <div>
        <div className={styles.listHeader}>
          <h2>Lists</h2>
          <button type="button" className={styles.addList}>
            <i className="fas fa-plus" />
          </button>
        </div>
        <ul>
          <li>Favourites</li>
          <li>Movies</li>
          <li>Netflix Marvel</li>
          <li>Anime</li>
        </ul>
      </div>
    </aside>
  );
}

export default SidebarLeft;
