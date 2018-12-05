import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as selectors from 'app/store';
import * as handleShows from 'modules/shows/sortedList';

import showsType from 'types';
import styles from './List.scss';
import ListHead from './list/ListHead';
import ListBody from './list/ListBody';

const mapStateToProps = state => ({
  shows: selectors.getVisibleShows(state, 'all'),
  caption: selectors.createListCaption(state),
  activeStatus: selectors.getActiveStatus(state),
  activeTags: selectors.getTagNames(state, 'active'),
  showColumn: [],
});

class List extends Component {
  constructor(props) {
    super(props);
    this.listHotKeys = this.listHotKeys.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(handleShows.fetchShows());

    document.addEventListener('keydown', this.listHotKeys);
  }

  componentWillUnmout() {
    document.removeEventListener('keydown', this.listHotKeys);
  }

  listHotKeys(e) {
    const {
      dispatch,
      activeTags,
      activeStatus,
    } = this.props;
    if (e.target.tagName === 'INPUT' || e.target.isContentEditable) return;
    if (e.keyCode === 78) {
      dispatch(handleShows.addShow(activeStatus, activeTags, null));
    }
  }

  render() {
    const { shows, caption } = this.props;
    return (
      <table className={styles.list}>
        <caption>
          {caption}
        </caption>
        <ListHead />
        <ListBody shows={shows} />
      </table>
    );
  }
}

List.propTypes = {
  shows: showsType,
  caption: PropTypes.string.isRequired,
  activeStatus: PropTypes.string.isRequired,
  activeTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
};

List.defaultProps = {
  shows: [],
};

export default connect(mapStateToProps)(List);
