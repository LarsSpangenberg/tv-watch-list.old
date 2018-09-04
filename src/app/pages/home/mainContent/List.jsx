import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './List.scss';
import ListHead from './list/ListHead';
import ListBody from './list/ListBody';
import showsType from 'types';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { shows } = this.props;
    return (
      <table className={styles.list}>
        <caption>All</caption>
        <ListHead />
        <ListBody shows={shows} />
      </table>
    );
  }
}

List.propTypes = {
  shows: showsType,
};

List.defaultProps = {
  shows: [],
};

export default List;
