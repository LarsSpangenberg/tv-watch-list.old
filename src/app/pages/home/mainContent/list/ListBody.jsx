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
    displayShows = shows.map((show) => {
      if (!show) {
        return <LoadingShow />;
      }
      return (
        <ListItem
          key={show._id}
          showId={show._id}
          title={show.title}
          currentSeason={parseInt(show.currentSeason)}
          currentEpisode={parseInt(show.currentEpisode)}
          comments={show.comments}
          status={show.status}
          tags={show.tags}
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
