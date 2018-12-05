import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as selectors from 'app/store';
import * as handleShows from 'modules/shows/sortedList';
import * as handleTags from 'modules/tags/createList';
import handleContentEditable from 'utils/handleContentEditable';

import styles from './ListItem.scss';
import Title from './listItem/Title';
import Season from './listItem/Season';
import Episode from './listItem/Episode';
import Comment from './listItem/Comment';
import Options from './listItem/Options';
import Status from './listItem/Status';
import Tags from './listItem/Tags';

const mapStateToProps = (state, ownProps) => ({
  isNew: selectors.isShowNew(state, ownProps.showId),
  index: selectors.getShowIndex(state, ownProps.showId),
  activeStatus: selectors.getActiveStatus(state),
  activeTags: selectors.getTagNames(state, 'active'),
  allTags: selectors.getTagNames(state, 'all'),
  tags: selectors.getShowTags(state, ownProps.showId),
  order: selectors.getSortOrder(state),
  isHidden: name => selectors.isColumnHidden(state, name),
});

// TODO: map all dispatches

const mapDispatchToProps = dispatch => ({
  addTag: tag => dispatch(handleTags.addTag(tag)),
  dispatch,
});

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      currentSeason: 1,
      currentEpisode: 1,
      comments: '',
      status: '',
      data: {},
      postData: {},
    };
    this.apiRequestTimer = null;
    this.initItem = this.initItem.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleIncDec = this.handleIncDec.bind(this);
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
      data,
    } = this.props;
    this.setState({
      title,
      currentSeason,
      currentEpisode,
      comments,
      status,
      data,
    });
  }

  addShow() {
    const {
      index: i,
      activeStatus: status,
      activeTags: tags,
      order,
      dispatch,
    } = this.props;
    const params = {
      status,
      tags,
      index: i + 1,
      order
    };
    dispatch(handleShows.addShow(params));
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

  clickHandler(e) {
    const { name, value } = e.target || e;
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

  generateWeakKey(data, index) {
    const { showId } = this.props;
    const name = data.replace(/ /g, '_');
    const result = `${showId}_${name}`;
    return (index || index === 0) ? result.concat(`_${index}`) : result;
  }

  render() {
    const {
      title,
      currentSeason,
      currentEpisode,
      comments,
      status,
    } = this.state;
    const {
      allTags,
      tags,
      isHidden,
      isNew,
      addTag,
      i,
      last,
    } = this.props;

    const cellStyle = name => [
      styles[name],
      isHidden(name) ? styles.hidden : '',
    ].join(' ');

    const tagNum = tags.length;
    let tagsPlaceholder;
    if (tagNum === 0) {
      tagsPlaceholder = <i className="fas fa-plus" />;
    } else if (tagNum < 6) {
      tagsPlaceholder = tags.join(', ');
    } else {
      tagsPlaceholder = `${tags.slice(0, 5).join(', ')}, ...`;
    }

    const moveShow = direction => (
      <button type="button" className={styles.move}>
        <i className={`fas fa-chevron-${direction}`} />
      </button>
    );

    return (
      <tr className={styles.listItem}>
        <Title
          styleClass={cellStyle('title')}
          title={title}
          handleChange={this.handleChange}
          isNew={isNew}
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

        <Tags
          styleClass={cellStyle('tags')}
          placeholder={tagsPlaceholder}
          tags={tags}
          allTags={allTags}
          addTag={addTag}
          updateShow={this.updateShow}
          generateWeakKey={this.generateWeakKey}
        />

        <Status
          styleClass={cellStyle('status')}
          status={status}
          placeholder={status}
          clickHandler={this.clickHandler}
          generateWeakKey={this.generateWeakKey}
        />

        <Comment
          styleClass={cellStyle('comment')}
          comments={comments}
          handleChange={this.handleChange}
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
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  allTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.object, // eslint-disable-line
  activeStatus: PropTypes.string.isRequired,
  activeTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  index: PropTypes.number,
  i: PropTypes.number.isRequired,
  last: PropTypes.bool.isRequired,
  isNew: PropTypes.bool.isRequired,
  isHidden: PropTypes.func.isRequired,
  addTag: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

ListItem.defaultProps = {
  title: '',
  currentSeason: 1,
  currentEpisode: 1,
  comments: '',
  status: 'current',
  data: {},
  index: 0,
};


export default connect(mapStateToProps, mapDispatchToProps)(ListItem);
