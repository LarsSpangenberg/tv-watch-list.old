import React from 'react';

import styles from './SidebarRight.scss';


function SidebarRight(props) {
  return (
    <aside className={styles.sidebar}>
      <i className={`fas fa-sort-alpha-down ${styles.icon}`} />
      <i className={`fas fa-th-list ${styles.icon}`} />
      <i className={`far fa-calendar-alt ${styles.icon}`} />
      <i className={`fas fa-cogs ${styles.icon}`} />
    </aside>
  );
}

export default SidebarRight;
