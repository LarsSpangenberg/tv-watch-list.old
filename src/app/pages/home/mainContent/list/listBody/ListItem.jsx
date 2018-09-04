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
      tags,
      data,
    } = this.props;
    this.setState({
      title,
      currentSeason: parseInt(currentSeason),
      currentEpisode: parseInt(currentEpisode),
      comments,
      status,
      tags,
      data,
    });
  }

  handleChange(e) {
    const { name, value } = e.target;
    if (value > 0) {
      this.setState({
        [name]: parseInt(value),
      });
    } else {
      this.setState({
        [name]: '',
      });
    }
  }

  handleIncDec(e) {
    const { name, value } = e.target;
    /* eslint-disable react/destructuring-assignment */
    if (this.state[name] >= 0 && value === 'plus') {
      this.setState(prevState => ({
        [name]: (prevState[name] + 1),
      }));
    } else if (this.state[name] > 0 && value === 'minus') {
      this.setState(prevState => ({
        [name]: (prevState[name] - 1),
      }));
    }
    /* eslint-enable react/destructuring-assignment */
  }

  render() {
    const {
      title,
      currentSeason,
      currentEpisode,
      comments,
      status,
      tags,
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
  tags: PropTypes.arrayOf(PropTypes.string),
  data: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

ListItem.defaultProps = {
  currentSeason: 1,
  currentEpisode: 1,
  comments: '',
  status: '',
  tags: [],
  data: {},
};


export default ListItem;
