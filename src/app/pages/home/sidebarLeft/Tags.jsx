import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

import styles from './Tags.scss';
import SortTags from './tags/SortTags';

class Tags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTag: '',
      editing: false,
      sortBy: 'dateAdded',
      sortOrder: 'desc',
      topTags: '',
    };
    this.addTagInput = createRef();
    this.tagList = createRef();
    this.editButton = createRef();
    this.toggleEdit = this.toggleEdit.bind(this);
    this.closeEditMode = this.closeEditMode.bind(this);
    this.handleTag = this.handleTag.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleEsc = this.handleEsc.bind(this);
    this.handleSortTags = this.handleSortTags.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.closeEditMode);
    document.addEventListener('keyup', this.handleEsc);
  }

  componentWillUnmout() {
    document.removeEventListener('click', this.closeEditMode);
    document.removeEventListener('keyup', this.handleEsc);
  }

  toggleEdit() {
    this.setState(prevState => ({
      editing: !prevState.editing,
    }), () => {
      if (this.addTagInput.current) {
        this.addTagInput.current.focus();
      }
    });
  }

  closeEditMode(e) {
    const { editing } = this.state;
    const containsTarget = ref => ref.current.contains(e.target);
    if (
      !editing
      || containsTarget(this.tagList)
      || containsTarget(this.editButton)
    ) {
      return;
    }
    this.setState({
      editing: false,
    });
  }

  handleTag(e) {
    const { handleTag } = this.props;
    handleTag(e);
    this.setState({
      newTag: '',
    });
  }

  handleChange(e) {
    const { value } = e.target;
    this.setState({
      newTag: value,
    });
  }

  handleEnter(e) {
    if (e.keyCode === 13) {
      this.handleTag(e);
    }
  }

  handleEsc(e) {
    const { editing } = this.state;
    if (!editing) return;
    if (e.keyCode === 27) {
      this.setState({
        editing: false,
      });
    }
  }

  handleSortTags(e) {
    const { name, value } = e.target;
    this.setState((prevState) => {
      const newState = {};
      switch (name) {
        case 'alphabetical':
          newState.sortBy = 'name';
          newState.sortOrder = value;
          break;
        case 'dateAdded':
          newState.sortBy = 'dateAdded';
          newState.sortOrder = value;
          break;
        case 'active': {
          if (prevState.topTags === 'active') {
            newState.topTags = '';
          } else {
            newState.topTags = 'active';
          }
          break;
        }
        case 'inactive': {
          if (prevState.topTags === 'inactive') {
            newState.topTags = '';
          } else {
            newState.topTags = 'inactive';
          }
          break;
        }
        default:
          newState.sortBy = 'dateAdded';
          newState.sortOrder = 'desc';
      }
      return newState;
    });
  }

  render() {
    const {
      styleClass,
      getTags,
      count,
    } = this.props;
    const {
      newTag,
      editing,
      sortBy,
      sortOrder,
      topTags,
    } = this.state;

    const tagList = getTags(sortBy, sortOrder, topTags).map((tag) => {
      const { _id, name, active } = tag;
      let removeTag;
      if (editing) {
        removeTag = (
          <button
            className={styles.removeTag}
            type="button"
            value={_id}
            name="remove"
            onClick={this.handleTag}
          >
            <i className="fas fa-minus" />
          </button>
        );
      }

      return (
        <li key={`sidebar_left_tag_${name}`}>
          <button
            className={active ? styles.active : ''}
            type="button"
            name="tags"
            value={_id}
            onClick={this.handleTag}
          >
            {name}
          </button>
          {removeTag}
        </li>
      );
    });

    let addTag;
    if (editing) {
      addTag = (
        <li className={styles.addTagContainer}>
          <input
            placeholder="New Tag"
            name="add"
            value={newTag}
            ref={this.addTagInput}
            onChange={this.handleChange}
            onKeyUp={this.handleEnter}
          />
          <button
            className={styles.addTagButton}
            type="button"
            value={newTag}
            name="add"
            onClick={this.handleTag}
          >
            <i className="fas fa-plus" />
          </button>
        </li>
      );
    }

    const noTags = (
      <li className={styles.noTags}>
        You have no tags yet. Click the edit button to add or remove tags.
      </li>
    );

    return (
      <div className={[
        styleClass.tags,
        styles.tags,
        editing ? styles.editing : null].join(' ')}
      >
        <div className={styleClass.label}>
          <h2>Tags:</h2>
          <SortTags
            styleClass={styles.sortTags}
            clickHandler={this.handleSortTags}
            sortBy={sortBy}
            sortOrder={sortOrder}
            topTags={topTags}
          />
          <button
            className={styles.editTags}
            type="button"
            onClick={this.toggleEdit}
            ref={this.editButton}
          >
            <i className="fas fa-edit" />
          </button>
        </div>
        <ul
          className={[styleClass.list, styles.list].join(' ')}
          ref={this.tagList}
        >
          {addTag}
          {count === 0 ? noTags : tagList}
        </ul>
      </div>
    );
  }
}

Tags.propTypes = {
  styleClass: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
  count: PropTypes.number.isRequired,
  getTags: PropTypes.func.isRequired,
  handleTag: PropTypes.func.isRequired,
};

export default Tags;
