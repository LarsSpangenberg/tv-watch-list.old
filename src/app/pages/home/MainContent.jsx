import React, { Component } from 'react';
import PropTypes from 'prop-types';


import styles from './MainContent.scss';
import List from './mainContent/List';
import ListItem from './mainContent/list/listBody/ListItem';

class MainContent extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { shows } = this.props;
    return (
      <section className={styles.main}>
        <List>
          {shows.map(show => (
            <ListItem
              title={show.title}
              currentSeason={show.currentSeason}
              currentEpisode={show.currentEpisode}
              comments={show.comments}
              status={show.status}
              lists={show.lists}
              data={show.data}
            />
          ))}
        </List>
      </section>
    );
  }
}

MainContent.propTypes = {
  shows: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      currentSeason: PropTypes.number,
      currentEpisode: PropTypes.number,
      comments: PropTypes.string,
      status: PropTypes.string,
      lists: PropTypes.arrayOf(PropTypes.string),
      data: PropTypes.object,
    }),
  ),
};

MainContent.defaultProps = {
  shows: 'no shows yet',
};

export default MainContent;
