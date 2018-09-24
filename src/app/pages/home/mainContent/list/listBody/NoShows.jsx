import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addShow } from 'modules/shows/createList';
import styles from './NoShows.scss';

const mapStateToProps = state => ({
  activeStatus: 'current',
  activeTags: ['Marvel', 'Netflix'],
});

class NoShows extends Component {
  constructor() {
    super();
    this.addShow = this.addShow.bind(this);
  }

  addShow() {
    const { activeTags, activeStatus, dispatch } = this.props;
    dispatch(addShow(activeStatus, activeTags, 0));
  }

  render() {
    return (
      <tr className={styles.noShows}>
        <td colSpan="10">
          <button type="button" onClick={this.addShow}>
            Your watchlist is empty! Click here to add a show!
          </button>
        </td>
      </tr>
    );
  }
}

NoShows.propTypes = {
  activeStatus: PropTypes.string.isRequired,
  activeTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
};


export default connect(mapStateToProps)(NoShows);
