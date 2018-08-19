import React, { Component } from 'react';

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
        <caption>Favs</caption>
        <ListHead />
        <ListBody />
      </table>
    );
  }
}

export default List;
