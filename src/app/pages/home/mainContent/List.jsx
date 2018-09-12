import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from './List.scss';
import ListHead from './list/ListHead';
import ListBody from './list/ListBody';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <table className={styles.list}>
        <caption>All</caption>
        <ListHead />
        <ListBody />
      </table>
    );
  }
}

export default connect()(List);
