import React from 'react';
import PropTypes from 'prop-types';

import showsType from 'types';
// import styles from './ListBody.scss';
import ListItem from './listBody/ListItem';
import NoShows from './listBody/NoShows';
import LoadingShow from './listBody/LoadingShow';

const ListBody = ({ shows }) => {
  let displayShows;
  if (shows.length > 0) {
    displayShows = shows.map((show, i) => {
      if (!show) {
        return <LoadingShow />;
      }
      return (
        <ListItem
          key={show._id}
          showId={show._id}
          i={i}
          last={i === shows.length - 1}
          title={show.title}
          currentSeason={parseInt(show.currentSeason)}
          currentEpisode={parseInt(show.currentEpisode)}
          comments={show.comments}
          status={show.status}
          data={show.data}
        />
      );
    });
  } else {
    displayShows = <NoShows />;
  }

  return (
    <tbody>
      {displayShows}
    </tbody>
  );
};


ListBody.propTypes = {
  shows: showsType,
};

ListBody.defaultProps = {
  shows: [],
};

export default ListBody;
