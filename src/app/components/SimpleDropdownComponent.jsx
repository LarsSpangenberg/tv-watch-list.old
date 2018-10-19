import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

import { handleClose, navigateDropdown } from 'utils/handleKeypress';
import styles from './SimpleDropdownComponent.scss';

const SimpleDropdownComponent = (WrappedComponent, CustomTag, defaultElement, style) => {
  class Dropdown extends Component {
    constructor(props) {
      super(props);
      this.state = {
        active: false,
        focusStyle: styles.focus,
      };
      this.timer = null;
      this.dropdown = createRef();
      this.openDropdown = this.openDropdown.bind(this);
      this.handleClickOutside = this.handleClickOutside.bind(this);
      this.handleKeypress = this.handleKeypress.bind(this);
      this.closeDropdown = this.closeDropdown.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
      const { active } = this.state;
      if (active !== prevState.active) {
        if (active) {
          setTimeout(() => {
            if (style && {}.hasOwnProperty.call(style, 'focus')) {
              this.setState({ focusStyle: style.focus });
            }
            const { focusStyle } = this.state;
            const { classList, firstChild } = this.dropdown.current;
            classList.add(styles.showing);
            firstChild.firstChild.classList.add(focusStyle);
            document.addEventListener('mousedown', this.handleClickOutside);
            document.addEventListener('keydown', this.handleKeypress);
            setTimeout(() => { firstChild.firstChild.focus(); }, 200);
          }, 200);
        } else if (!active) {
          document.removeEventListener('mousedown', this.handleClickOutside);
          document.removeEventListener('keydown', this.handleKeypress);
        }
      }
    }

    openDropdown() {
      this.setState({ active: true });
    }

    handleClickOutside(e) {
      const { active } = this.state;
      if (active) {
        if (this.dropdown.current && this.dropdown.current.contains(e.target)) {
          return;
        }
      }

      this.closeDropdown();
    }

    closeDropdown() {
      if (this.dropdown.current) {
        this.dropdown.current.classList.remove(styles.showing);

        setTimeout(() => {
          this.setState({ active: false });
        }, 200);
      }
    }

    handleKeypress(e) {
      const { focusStyle } = this.state;
      navigateDropdown(e.keyCode, this.dropdown.current, focusStyle);
      handleClose(e.keyCode, { esc: this.closeDropdown, escOnTab: true });
    }


    render() {
      const {
        styleClass,
        placeholder,
        abovePH,
        belowPH,
        ...props
      } = this.props;
      const { active } = this.state;

      let displayOptions;
      if (active) {
        displayOptions = (
          <div className={styles.container}>
            <ul ref={this.dropdown}>
              <WrappedComponent {...props} closeDropdown={this.closeDropdown} />
            </ul>
          </div>
        );
      } else {
        displayOptions = (
          <button
            type="button"
            onMouseUp={this.openDropdown}
            onFocus={this.openDropdown}
          >
            {placeholder || defaultElement}
          </button>
        );
      }


      return (
        <CustomTag
          className={[
            styleClass,
            styles.options,
          ].join(' ')}
        >
          {active ? '' : abovePH}
          {displayOptions}
          {active ? '' : belowPH}
        </CustomTag>
      );
    }
  }

  Dropdown.propTypes = {
    styleClass: PropTypes.string,
    placeholder: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
      PropTypes.number,
    ]),
    abovePH: PropTypes.element,
    belowPH: PropTypes.element,
  };

  Dropdown.defaultProps = {
    styleClass: '',
    placeholder: null,
    abovePH: null,
    belowPH: null,
  };

  return Dropdown;
};

SimpleDropdownComponent.propTypes = {
  WrappedComponent: PropTypes.element.isRequired,
  defaultElement: PropTypes.string.isRequired,
  CustomTag: PropTypes.string.isRequired,
};

export default SimpleDropdownComponent;
