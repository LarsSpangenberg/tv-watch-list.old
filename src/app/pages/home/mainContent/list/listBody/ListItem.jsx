import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as selectors from 'app/store';
import * as handleShows from 'modules/shows/createList';
import handleContentEditable from 'utils/handleContentEditable';

import styles from './ListItem.scss';
import Thumbnail from './listItem/Thumbnail';
import Title from './listItem/Title';
import Season from './listItem/Season';
import Episode from './listItem/Episode';
import Comment from './listItem/Comment';
import Options from './listItem/Options';
import Status from './listItem/Status';
import Tags from './listItem/Tags';

const mapStateToProps = (state, ownProps) => ({
  index: selectors.getShowIndexFromAll(state, ownProps.showId),
  activeStatus: 'completed',
  activeTags: ['Marvel', 'Netflix'],
  tagList: ['Marvel', 'Netflix', 'Superhero', 'Comedy', 'Anime', 'Movie'],
  isHidden: name => selectors.isColumnHidden(state, name),
});

// const mapDispatchToProps = dispatch => ({
//   addShow: (status, activeTags, prevItemIindex) => dispatch(handleShows.addShow()),
//   updateShow: formData => dispatch(handleShows.updateShow(formData)),
// });

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      currentSeason: 1,
      currentEpisode: 1,
      comments: '',
      status: 'completed',
      tags: [],
      data: {},
      postData: {},
    };
    this.apiRequestTimer = null;
    this.initItem = this.initItem.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleIncDec = this.handleIncDec.bind(this);
    this.handleTag = this.handleTag.bind(this);
    this.addShow = this.addShow.bind(this);
    this.removeShow = this.removeShow.bind(this);
    this.updateShow = this.updateShow.bind(this);
    this.generateWeakKey = this.generateWeakKey.bind(this);
  }

  componentDidMount() {
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
      currentSeason,
      currentEpisode,
      comments,
      status,
      tags,
      data,
    });
  }

  // list item handlers -----------------------------------------------
  addShow() {
    const {
      index,
      activeStatus,
      activeTags,
      dispatch,
    } = this.props;
    dispatch(handleShows.addShow(activeStatus, activeTags, index + 1));
  }

  removeShow() {
    const { showId, dispatch } = this.props;
    dispatch(handleShows.removeShow(showId));
  }

  updateShow(key, value) {
    this.setState(state => ({
      [key]: value,
      postData: { ...state.postData, [key]: value },
    }));

    clearTimeout(this.apiRequestTimer);

    this.apiRequestTimer = setTimeout(() => {
      const { dispatch, showId } = this.props;
      const { postData } = this.state;
      postData.id = showId;
      console.log(postData);
      dispatch(handleShows.updateShow(postData));
    }, 1000);
  }

  // update show properties -------------------------------------------------

  clickHandler(e) {
    const { name, value } = e.target;
    this.updateShow(name, value);
  }

  handleChange(e) {
    let { name, value } = e.target;

    if (e.target.tagName === 'DIV') {
      const { dataset, innerText } = e.target;
      value = innerText;
      name = dataset.name; // eslint-disable-line
      handleContentEditable(e.target);
    }

    this.updateShow(name, value);
  }

  handleIncDec(e) {
    const { name, value } = e.target;
    const { ...state } = this.state;
    let nextValue;
    if (state[name] >= 0 && value === 'plus') {
      nextValue = state[name] + 1;
    } else if (state[name] > 0 && value === 'minus') {
      nextValue = state[name] - 1;
    }
    this.updateShow(name, nextValue);
  }

  handleTag(e) {
    const { name, value } = e.target;
    const { tags } = this.state;
    let newTags;
    if (value === 'minus' && tags.indexOf(name) !== -1) {
      // --------- remove tag --------------
      const index = tags.indexOf(name);
      newTags = [
        ...tags.slice(0, index),
        ...tags.slice(index + 1),
      ];
    } else if (name === 'suggestions') {
      // ------- add suggested tag -----------
      newTags = [...tags, value];
    }

    this.updateShow('tags', newTags);
  }

  // utility ---------------------------------------------------------
  generateWeakKey(data, index) {
    const { showId } = this.props;
    const name = data.replace(/ /g, '_');
    return `${showId}_${name}_${index}`;
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
    const { tagList, isHidden } = this.props;
    const cellStyle = name => [
      styles[name],
      isHidden(name) ? styles.hidden : '',
    ].join(' ');

    return (
      <tr className={styles.listItem}>
        <Thumbnail
          styleClass={styles.thumbnail}
        />

        <Title
          styleClass={cellStyle('title')}
          title={title}
          handleChange={this.handleChange}
        />

        <Season
          styleClass={cellStyle('season')}
          currentSeason={currentSeason}
          handleChange={this.handleChange}
          handleIncDec={this.handleIncDec}
        />

        <Episode
          styleClass={cellStyle('episode')}
          currentEpisode={currentEpisode}
          handleChange={this.handleChange}
          handleIncDec={this.handleIncDec}
        />

        <Comment
          styleClass={cellStyle('comment')}
          comments={comments}
          handleChange={this.handleChange}
        />

        <Tags
          styleClass={{
            tags: cellStyle('tags'),
            adding: styles.adding,
          }}
          tags={tags}
          tagList={tagList}
          handleChange={this.handleChange}
          handleTag={this.handleTag}
          generateWeakKey={this.generateWeakKey}
        />
        <Status
          styleClass={cellStyle('status')}
          status={status}
          placeholder={status}
          clickHandler={this.clickHandler}
          generateWeakKey={this.generateWeakKey}
        />
        <Options
          styleClass={styles.options}
          addShow={this.addShow}
          removeShow={this.removeShow}
        />
      </tr>
    );
  }
}

ListItem.propTypes = {
  showId: PropTypes.string.isRequired,
  title: PropTypes.string,
  currentSeason: PropTypes.number,
  currentEpisode: PropTypes.number,
  comments: PropTypes.string,
  status: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  tagList: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.object, // eslint-disable-line
  activeStatus: PropTypes.string.isRequired,
  activeTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  index: PropTypes.number,
  isHidden: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

ListItem.defaultProps = {
  title: '',
  currentSeason: 1,
  currentEpisode: 1,
  comments: '',
  status: '',
  tags: [],
  data: {},
  index: 0,
};


export default connect(mapStateToProps)(ListItem);
