import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './ListItem.scss';
import Thumbnail from './listItem/Thumbnail';
import Title from './listItem/Title';
import Season from './listItem/Season';
import Episode from './listItem/Episode';
import Comment from './listItem/Comment';

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      currentSeason: 1,
      currentEpisode: 1,
      comments: '',
      status: '',
      lists: [],
      data: {},
    };
    this.initItem = this.initItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleIncDec = this.handleIncDec.bind(this);
  }

  componentWillMount() {
    this.initItem();
  }

  initItem() {
    const {
      title,
      currentSeason,
      currentEpisode,
      comments,
      status,
      lists,
      data,
    } = this.props;
    this.setState({
      title,
      currentSeason: parseInt(currentSeason),
      currentEpisode: parseInt(currentEpisode),
      comments,
      status,
      lists,
      data,
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleIncDec(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: (value == "plus" ? this.state[name] + 1 : this.state[name] - 1), // eslint-disable-line
    });
  }

  render() {
    const {
      title,
      currentSeason,
      currentEpisode,
      comments,
      status,
      lists,
      data,
    } = this.state;
    return (
      <tr className={styles.listItem}>
        <Thumbnail
          styleClass={styles.thumbnail}
        />

        <Title
          styleClass={styles.title}
          title={title}
          handleChange={this.handleChange}
        />

        <Season
          styleClass={styles.season}
          currentSeason={currentSeason}
          handleChange={this.handleChange}
          handleIncDec={this.handleIncDec}
        />

        <Episode
          styleClass={styles.episode}
          currentEpisode={currentEpisode}
          handleChange={this.handleChange}
          handleIncDec={this.handleIncDec}
          lastEpisode={data.lastEpisode.number || data.lastEpisode}
        />

        <Comment
          styleClass={styles.comment}
          comments={comments}
          handleChange={this.handleChange}
        />
      </tr>
    );
  }
}

ListItem.propTypes = {
  title: PropTypes.string.isRequired,
  currentSeason: PropTypes.number,
  currentEpisode: PropTypes.number,
  comments: PropTypes.string,
  status: PropTypes.string,
  lists: PropTypes.arrayOf(PropTypes.string),
  data: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

ListItem.defaultProps = {
  currentSeason: 1,
  currentEpisode: 1,
  comments: '',
  status: '',
  lists: [],
  data: {},
};


export default ListItem;
