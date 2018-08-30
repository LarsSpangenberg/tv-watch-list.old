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
    let listItems = '';

    if (shows) {
      listItems = shows.map(show => (
        <ListItem
          title={show.title}
          currentSeason={parseInt(show.currentSeason)}
          currentEpisode={parseInt(show.currentEpisode)}
          comments={show.comments}
          status={show.status}
          lists={show.lists}
          data={show.data}
        />
      ));
    }

    return (
      <section className={styles.main}>
        <List>
          {listItems}
        </List>
      </section>
    );
  }
}

MainContent.propTypes = {
  shows: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      currentSeason: PropTypes.string,
      currentEpisode: PropTypes.string,
      comments: PropTypes.string,
      status: PropTypes.string,
      lists: PropTypes.arrayOf(PropTypes.string),
      data: PropTypes.object,
    }),
  ),
};

MainContent.defaultProps = {
  shows: [],
};

export default MainContent;
