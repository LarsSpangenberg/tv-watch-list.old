import React, { Component, Fragment, createRef } from 'react';
import PropTypes from 'prop-types';

import SimpleDropdownComponent from 'components/SimpleDropdownComponent';
import queryArray, { findMatch } from 'utils/queryArray';
import { handleEnter } from 'utils/handleKeypress';
import styles from './Tags.scss';


class Tags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      usedTags: [],
      unusedTags: [],
      suggestedUsed: [],
      suggestedUnused: [],
      numShowing: 0,
      cursor: 0,
    };
    this.inputRef = createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleTag = this.handleTag.bind(this);
    this.setupSuggestions = this.setupSuggestions.bind(this);
    this.sortSuggestions = this.sortSuggestions.bind(this);
    this.navigateSuggestions = this.navigateSuggestions.bind(this);
    this.clickInput = this.clickInput.bind(this);
    this.submitInput = this.submitInput.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.navigateSuggestions);
    this.setupSuggestions();
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.navigateSuggestions);
  }

  setupSuggestions() {
    const { tags, allTags } = this.props;
    const unusedTags = [...allTags];

    tags.forEach((tag) => {
      const i = unusedTags.indexOf(tag);
      unusedTags.splice(i, 1);
    });

    this.setState({
      usedTags: tags,
      unusedTags,
      suggestedUsed: tags,
      suggestedUnused: unusedTags,
      numShowing: allTags.length,
    });
  }

  sortSuggestions() {
    const { usedTags, unusedTags, input } = this.state;
    const suggestedUsed = queryArray(usedTags, input);
    const suggestedUnused = queryArray(unusedTags, input);
    const numShowing = suggestedUsed.length + suggestedUnused.length;
    this.setState({
      suggestedUsed,
      suggestedUnused,
      numShowing,
    });
  }

  handleChange(e) {
    const { value } = e.target || e;
    this.setState({
      input: value,
      cursor: 0,
    }, () => {
      this.sortSuggestions();
    });
  }

  handleTag(e) {
    const { updateShow } = this.props;
    const { usedTags: used, unusedTags: unused, input } = this.state;
    const { name, value } = e.target || e;

    function adjustArrays(addingTo, removingFrom) {
      const i = removingFrom.indexOf(value);
      return [
        [...addingTo, value],
        [...removingFrom.slice(0, i), ...removingFrom.slice(i + 1)],
      ];
    }

    let usedTags;
    let unusedTags;
    if (name === 'tags') {
      [unusedTags, usedTags] = adjustArrays(unused, used);
    } else if (name === 'suggestions') {
      [usedTags, unusedTags] = adjustArrays(used, unused);
    } else if (name === 'search') {
      usedTags = [...used, value];
      unusedTags = [...unused];
    }

    updateShow('tags', usedTags);
    this.setState({
      usedTags,
      unusedTags,
      suggestedUsed: queryArray(usedTags, input),
      suggestedUnused: queryArray(unusedTags, input),
    });
  }

  navigateSuggestions(e) {
    const el = document.getElementsByClassName(styles.focus)[0];
    const submit = () => {
      if (el.name === 'search') {
        this.submitInput(el);
      } else {
        this.handleTag(el);
      }
    };
    handleEnter(e.keyCode, submit);
  }

  clickInput() {
    this.setState({ cursor: 0 });
  }

  submitInput(el) {
    const { input, usedTags, unusedTags } = this.state;
    const { addTag } = this.props;
    const usedMatch = findMatch(usedTags, input);
    const unusedMatch = findMatch(unusedTags, input);

    let values = el;
    if (usedMatch) {
      values = { name: 'tags', value: usedMatch };
    } else if (unusedMatch) {
      values = { name: 'suggestions', value: unusedMatch };
    } else {
      addTag(input);
    }
    this.handleTag(values);

    this.setState({
      cursor: 0,
      input: '',
    });
    this.sortSuggestions();
  }

  render() {
    const {
      input,
      suggestedUsed,
      suggestedUnused,
      numShowing,
      cursor,
    } = this.state;
    const { generateWeakKey } = this.props;
    const inputId = generateWeakKey('input');

    let i = 1;
    const createSuggestions = (array, name) => {
      const icon = name === 'tags' ? 'minus' : 'plus';
      return array.map((suggestion) => {
        const id = generateWeakKey('suggestions', i);
        const index = i;
        i += 1;
        return (
          <li
            key={id}
            className={styles.tags}
          >
            <button
              name={name}
              type="button"
              value={suggestion}
              onClick={this.handleTag}
              tabIndex="-1"
            >
              {suggestion}
              <div className={styles.iconWrapper}>
                <i className={`fas fa-${icon}`} />
              </div>
            </button>
          </li>
        );
      });
    };

    let suggestions;
    if (numShowing > 0) {
      suggestions = [
        ...createSuggestions(suggestedUsed, 'tags'),
        ...createSuggestions(suggestedUnused, 'suggestions'),
      ];
    }

    return (
      <Fragment>
        <li
          key={inputId}
          id={inputId}
          className={styles.tags}
        >
          <input
            name="search"
            value={input}
            type="text"
            onChange={this.handleChange}
            onClick={this.clickInput}
            ref={this.inputRef}
          />
        </li>
        {suggestions}
      </Fragment>
    );
  }
}

Tags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  allTags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  addTag: PropTypes.func.isRequired,
  updateShow: PropTypes.func.isRequired,
  closeDropdown: PropTypes.func.isRequired,
  generateWeakKey: PropTypes.func.isRequired,
};

const style = {
  focus: styles.focus,
};
export default SimpleDropdownComponent(Tags, 'td', null, style);
