import React from 'react';
import PropTypes from 'prop-types';

import styles from './MainContent.scss';
import List from './mainContent/List';
import NotSignedInDisplay from './mainContent/NotSignedInDisplay';


const MainContent = (props) => {
  const { signedIn } = props;

  let mainDisplay;
  if (signedIn) {
    mainDisplay = <List />;
  } else {
    mainDisplay = <NotSignedInDisplay />;
  }

  return (
    <section className={styles.main}>
      {mainDisplay}
    </section>
  );
};

MainContent.propTypes = {
  signedIn: PropTypes.bool.isRequired,
};


export default MainContent;
