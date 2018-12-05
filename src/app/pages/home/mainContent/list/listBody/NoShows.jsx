import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as selectors from 'app/store';
import { addShow } from 'modules/shows/sortedList';
import styles from './NoShows.scss';

function mapStateToProps(state) {
  return {
    activeStatus: selectors.getActiveStatus(state),
    activeTags: selectors.getTagNames(state, 'active'),
    numOfAllShows: selectors.getNumberOfShows(state, 'all'),
    numOfActiveShows: selectors.getNumberOfShows(state),
  };
}

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
    const { numOfAllShows, numOfActiveShows } = this.props;
    let buttonText = 'No shows that contain selected tags are available! Click here to add a show!';
    if (numOfActiveShows === 0) {
      buttonText = 'No shows with selected status are available! Click here to add a show!';
    } else if (numOfAllShows === 0) {
      buttonText = 'Your watchlist is empty! Click here to add a show!';
    }
    return (
      <tr className={styles.noShows}>
        <td colSpan="10">
          <button type="button" onClick={this.addShow}>
            {buttonText}
          </button>
        </td>
      </tr>
    );
  }
}

NoShows.propTypes = {
  activeStatus: PropTypes.string.isRequired,
  activeTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  numOfAllShows: PropTypes.number.isRequired,
  numOfActiveShows: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};


export default connect(mapStateToProps)(NoShows);
