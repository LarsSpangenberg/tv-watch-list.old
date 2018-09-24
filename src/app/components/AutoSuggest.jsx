import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

import lowerCaseArray from 'utils/lowerCaseArray';
import styles from './AutoSuggest.scss';

class AutoSuggest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      suggestions: [],
      focused: true,
      submitting: false,
    };
    this.inputRef = createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleSuggestions = this.handleSuggestions.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onClick = this.onClick.bind(this);
    this.preventBlur = this.preventBlur.bind(this);
  }

  componentDidMount() {
    this.inputRef.current.focus();
    window.addEventListener('resize', this.onBlur);
  }

  componentDidUpdate(prevProps) {
    const { preventBlur } = this.props;
    if (prevProps.preventBlur !== preventBlur && preventBlur === true) {
      this.preventBlur();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onBlur);
  }


  onClick(e) {
    const { handleSuggestion } = this.props;
    handleSuggestion(e);
    this.inputRef.current.focus();
  }


  onFocus(e) {
    this.setState({
      focused: true,
    });
    this.handleSuggestions(e.target.value);
  }

  onBlur() {
    const { onBlur } = this.props;
    const { submitting } = this.state;
    if (!submitting) {
      this.setState({
        focused: false,
      });
      onBlur();
    }
  }

  preventBlur() {
    const el = this.inputRef.current;
    this.setState({
      submitting: true,
      focused: true,
    });
    setTimeout(() => {
      el.focus();
      this.handleSuggestions(el.value);
      this.setState({
        submitting: false,
      });
    }, 300);
  }

  handleChange(e) {
    const { value } = e.target;
    this.handleSuggestions(value);
    this.setState({
      input: value,
    });
  }

  handleSuggestions(value) {
    const { alreadyUsed, suggestionsArray } = this.props;

    const escapedValue = value.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'); // eslint-disable-line
    const regex = new RegExp(`^${escapedValue}`, 'i');
    const suggestions = suggestionsArray.sort().filter((el) => {
      const notUsed = lowerCaseArray(alreadyUsed).indexOf(el.toLowerCase()) === -1;
      const sameAsVal = el.toLowerCase() === value.toLowerCase();
      if (regex.test(el) && notUsed && !sameAsVal) return true;
      return false;
    });

    this.setState({
      suggestions: suggestions || '',
    });
  }

  render() {
    const { generateWeakKey } = this.props;
    const {
      suggestions,
      input,
      focused,
    } = this.state;
    const suggesting = suggestions.length > 0 ? styles.suggesting : '';

    // create dropdown buttons ------------------------------------------------
    // let dropdown;
    let dropdownSuggestions;
    if (suggestions.length > 0) {
      dropdownSuggestions = suggestions.map((suggestion, i) => (
        <li
          key={generateWeakKey(`suggested ${suggestion}`, i)}
        >
          <button
            name="suggestions"
            type="button"
            value={suggestion}
            onClick={this.onClick}
            onMouseDown={this.preventBlur}
          >
            {suggestion}
          </button>
        </li>
      ));
    }

    const dropdown = (
      <ul className={styles.dropdown}>
        <li
          key={generateWeakKey('input', 0)}
          className={styles.input}
        >
          <input
            name="tag input"
            value={input}
            type="text"
            onChange={this.handleChange}
            onBlur={this.onBlur}
            onFocus={this.onFocus}
            ref={this.inputRef}
          />
        </li>
        {dropdownSuggestions}
      </ul>
    );

    return (
      <div
        className={[
          styles.autoSuggest,
          suggesting,
          !focused ? styles.blurred : '',
        ].join(' ')}
      >
        {dropdown}
      </div>
    );
  }
}

AutoSuggest.propTypes = {
  alreadyUsed: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  suggestionsArray: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  generateWeakKey: PropTypes.func.isRequired,
  handleSuggestion: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  preventBlur: PropTypes.bool,
};

AutoSuggest.defaultProps = {
  onBlur: () => null,
  preventBlur: false,
};

export default AutoSuggest;
