import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

import styles from './Tags.scss';

class Tags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTag: '',
      editing: false,
    };
    this.addTagInput = createRef();
    this.tagList = createRef();
    this.editButton = createRef();
    this.toggleEdit = this.toggleEdit.bind(this);
    this.closeEditMode = this.closeEditMode.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.closeEditMode);
  }

  componentWillUnmout() {
    document.removeEventListener('click', this.closeEditMode);
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

    if (!editing || containsTarget(this.tagList) || containsTarget(this.editButton)) {
      return;
    }

    this.setState({
      editing: false,
    });
  }

  handleChange(e) {
    const { value } = e.target;
    this.setState({
      newTag: value,
    });
  }

  render() {
    const { styleClass, clickHandler } = this.props;
    const { newTag, editing } = this.state;

    const tags = ['Favorites', 'Marvel', 'Netflix', 'Superhero', 'Comedy'];
    const tagList = tags.map((tag) => {
      let removeTag;
      if (editing) {
        removeTag = (
          <button
            className={styles.removeTag}
            type="button"
            value={tag}
            name="remove"
          >
            <i className="fas fa-minus" />
          </button>
        );
      }

      return (
        <li key={`sidebar_left_tag_${tag}`}>
          <button
            type="button"
            name="tags"
            value={tag}
            onMouseUp={clickHandler}
          >
            {tag}
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
            value={newTag}
            ref={this.addTagInput}
            onChange={this.handleChange}
          />
          <button
            className={styles.addTagButton}
            type="button"
            value={newTag}
            name="addTag"
          >
            <i className="fas fa-plus" />
          </button>
        </li>
      );
    }


    return (
      <div className={[
        styleClass.tags,
        styles.tags,
        editing ? styles.editing : null].join(' ')}
      >
        <div className={styleClass.label}>
          <h2>Tags:</h2>
          <button
            className={styles.editTags}
            type="button"
            onClick={this.toggleEdit}
            ref={this.editButton}
          >
            <i className="fas fa-edit" />
          </button>
        </div>
        <ul className={styleClass.list} ref={this.tagList}>
          {addTag}
          {tagList}
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
  clickHandler: PropTypes.func.isRequired,
};

export default Tags;
