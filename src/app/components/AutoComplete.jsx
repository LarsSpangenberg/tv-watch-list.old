import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

import styles from './AutoComplete.scss';

class AutoComplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      autoComplete: '',
      focused: false,
    };
    this.staticInput = createRef();
    this.handleChange = this.handleChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onFocus() {
    this.setState({
      focused: true,
    });
  }

  onBlur() {
    this.setState({
      focused: false,
    });
  }

  handleChange(e) {
    const { value } = e.target;
    const { suggestionsArray } = this.props;

    let suggestions;
    if (value.length > 0) {
      const escapedValue = value.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'); // eslint-disable-line
      const regex = new RegExp(`^${escapedValue}`, 'i');
      suggestions = suggestionsArray.sort().find(el => regex.test(el));
    }
    console.log(suggestions);

    this.setState({
      input: value,
      autoComplete: suggestions || '',
    });
  }

  render() {
    // const { ...rest } = this.props;
    const {
      autoComplete,
      input,
      focused,
    } = this.state;
    const focusedClass = focused ? styles.focused : '';

    return (
      <div className={[styles.autoComplete, focusedClass].join(' ')}>
        <input
          value={autoComplete}
          type="text"
          ref={this.staticInput}
          disabled
        />
        <input
          value={input}
          type="text"
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChange={this.handleChange}
          {...this.props}
        />
      </div>
    );
  }
}

AutoComplete.propTypes = {
  suggestionsArray: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default AutoComplete;
