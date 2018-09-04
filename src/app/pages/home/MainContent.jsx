import React, { Component } from 'react';
import PropTypes from 'prop-types';


import styles from './MainContent.scss';
import List from './mainContent/List';
import showsType from 'types';


class MainContent extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { shows } = this.props;

    return (
      <section className={styles.main}>
        <List shows={shows} />
      </section>
    );
  }
}

MainContent.propTypes = {
  shows: showsType,
};

MainContent.defaultProps = {
  shows: [],
};

export default MainContent;
