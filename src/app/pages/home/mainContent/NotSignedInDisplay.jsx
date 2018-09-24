import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './NotSignedInDisplay.scss';
// import ListItem from './listBody/ListItem';

const NotSignedInDisplay = props => (
  <div className={styles.NotSignedInDisplay}>
    <h2>Please sign in to manage your watchlist</h2>
  </div>
);

export default NotSignedInDisplay;
