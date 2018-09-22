import React from 'react';

import styles from './ListItem.scss';

const LoadingShow = () => (
  <tr className={styles.listItem}>
    <td colSpan="10">List is updating....</td>
  </tr>
);

export default LoadingShow;
