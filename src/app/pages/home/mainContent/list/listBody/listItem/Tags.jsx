import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CellButton from 'components/CellButton';
import AutoSuggest from 'components/AutoSuggest';

import styles from './Tags.scss';

class Tags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInput: false,
      preventBlur: false,
    };
    this.onClick = this.onClick.bind(this);
    this.addingTag = this.addingTag.bind(this);
    this.removeTag = this.removeTag.bind(this);
    this.blurHandler = this.blurHandler.bind(this);
    this.preventBlur = this.preventBlur.bind(this);
  }

  // componentDidUpdate(prevProps, prevState) {
  //   const { showInput } = this.state;
  //   if (prevProps.preventBlur && prevProps.showInput && prevProps.showInput !== showInput) {
  //     this.setState({
  //       showInput: true,
  //     });
  //   }
  // }


  onClick() {
    this.setState({
      showInput: true,
    });
  }

  addingTag(e) {
    const { handleTag } = this.props;
    this.onClick();
    handleTag(e);
  }

  removeTag(e) {
    const { handleTag } = this.props;
    const { showInput } = this.state;
    handleTag(e);
    if (showInput) {
      this.onClick();
      this.preventBlur();
    }
  }

  blurHandler() {
    const { preventBlur } = this.state;
    if (!preventBlur) {
      setTimeout(() => {
        this.setState({
          showInput: false,
        });
      }, 400);
    }
  }

  preventBlur() {
    this.setState({
      preventBlur: true,
    });
    setTimeout(() => {
      this.setState({
        preventBlur: false,
      });
    }, 300);
  }

  render() {
    const {
      styleClass,
      tags,
      tagList: userTags,
      generateWeakKey,
    } = this.props;
    const { showInput, preventBlur } = this.state;
    const ellipsis = tags.length > 3 ? <i className={`fas fa-ellipsis-h ${styles.ellipsis}`} /> : null;

    // generate list of current tags for this show
    const tagList = tags.map((tag, i) => (
      <li
        key={generateWeakKey(tag, i)}
      >
        <p>
          {tag}
        </p>
        <CellButton
          name={tag}
          operation="minus"
          clickHandler={this.removeTag}
          mouseDown={this.preventBlur}
        />
      </li>
    ));

    // components that handle ability to add another tag to this show
    let addTag;
    if (showInput) {
      addTag = (
        <AutoSuggest
          alreadyUsed={tags}
          suggestionsArray={userTags}
          handleSuggestion={this.addingTag}
          generateWeakKey={generateWeakKey}
          onBlur={this.blurHandler}
          preventBlur={preventBlur}
        />
      );
    } else {
      addTag = (
        <CellButton
          name="tags"
          operation="plus"
          clickHandler={this.onClick}
        />
      );
    }

    return (
      <td className={[
        styleClass.tags,
        styles.tags,
        showInput ? `${styleClass.adding} ${styles.adding}` : ''].join(' ')}
      >
        <ul>
          {tagList}
        </ul>
        <div className={[
          ellipsis ? styles.manyTags : '',
          styles.lower].join(' ')}
        >
          {ellipsis}
          <div className={styles.addTag}>
            {addTag}
          </div>
        </div>
      </td>
    );
  }
}

Tags.propTypes = {
  styleClass: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  tagList: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  handleTag: PropTypes.func.isRequired,
  generateWeakKey: PropTypes.func.isRequired,
};

export default Tags;
