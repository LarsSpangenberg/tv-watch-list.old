import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as selectors from 'app/store';
import { fetchShows } from 'modules/shows/createList';

import showsType from 'types';
import styles from './List.scss';
import ListHead from './list/ListHead';
import ListBody from './list/ListBody';

const mapStateToProps = state => ({
  shows: selectors.getVisibleShows(state, 'all'),
  caption: selectors.createListCaption(state),
  showColumn: [],
});

class List extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchShows());
  }

  render() {
    const { shows, caption } = this.props;
    return (
      <table className={styles.list}>
        <caption>{caption}</caption>
        <ListHead />
        <ListBody shows={shows} />
      </table>
    );
  }
}

List.propTypes = {
  shows: showsType,
  caption: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

List.defaultProps = {
  shows: [],
};

export default connect(mapStateToProps)(List);
