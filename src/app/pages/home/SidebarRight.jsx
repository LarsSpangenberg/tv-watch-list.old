import React from 'react';

import styles from './SidebarRight.scss';


function SidebarRight(props) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.icons}>
        <i className={`fas fa-sort-alpha-down ${styles.icon}`} />
        <i className={`fas fa-th-list ${styles.icon}`} />
        <i className={`far fa-calendar-alt ${styles.icon}`} />
        <i className={`fas fa-cogs ${styles.icon}`} />
      </div>
    </aside>
  );
}

export default SidebarRight;
