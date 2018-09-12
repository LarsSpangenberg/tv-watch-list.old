import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import showsType from 'types';
import styles from './ListBody.scss';
import ListItem from './listBody/ListItem';

const mapStateToProps = (state) => {
  const { shows } = state;
  return { shows };
};

class ListBody extends Component {
  constructor(props) {
    super(props);
    this.displayShows = this.displayShows.bind(this);
  }

  displayShows() {
    const { shows } = this.props;

    if (shows.length > 0) {
      return shows.map(show => (
        <ListItem
          key={show.id}
          title={show.title}
          currentSeason={parseInt(show.current.season)}
          currentEpisode={parseInt(show.current.episode)}
          comments={show.comments}
          status={show.status}
          lists={show.tags}
          data={show.data}
        />
      ));
    }
    return '';
  }

  render() {
    return (
      <tbody>
        {this.displayShows()}
      </tbody>
    );
  }
}

ListBody.propTypes = {
  shows: showsType,
};

ListBody.defaultProps = {
  shows: [],
};

export default connect(mapStateToProps)(ListBody);
