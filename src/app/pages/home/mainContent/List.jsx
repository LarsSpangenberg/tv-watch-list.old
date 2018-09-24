import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as selectors from 'app/store';
import { fetchShows, addShow } from 'modules/shows/createList';

import showsType from 'types';
import styles from './List.scss';
import ListHead from './list/ListHead';
import ListBody from './list/ListBody';

const mapStateToProps = state => ({
  shows: selectors.getVisibleShows(state, 'all'),
  showColumn: [],
});

class List extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchShows());
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
  dispatch: PropTypes.func.isRequired,
};

List.defaultProps = {
  shows: [],
};

export default connect(mapStateToProps)(List);
