import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
    const { children } = this.props;
    return (
      <table className={styles.list}>
        <caption>Favs</caption>
        <ListHead />
        <ListBody>
          {children}
        </ListBody>
      </table>
    );
  }
}

List.propTypes = {
  children: PropTypes.node,
};

List.defaultProps = {
  children: '',
};

export default List;
