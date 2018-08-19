import React from 'react';

import styles from './MainContent.scss';
import List from './mainContent/List';

function MainContent(props) {
  return (
    <section className={styles.main}>
      <List />
    </section>
  );
}

export default MainContent;
