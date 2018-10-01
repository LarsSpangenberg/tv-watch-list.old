import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

import styles from './SimpleDropdownComponent.scss';

const SimpleDropdownComponent = (WrappedComponent, CustomTag, defaultElement) => {
  class Dropdown extends Component {
    constructor(props) {
      super(props);
      this.state = {
        active: false,
      };
      this.timer = null;
      this.dropdown = createRef();
      this.openDropdown = this.openDropdown.bind(this);
      this.handleClickOutside = this.handleClickOutside.bind(this);
      this.closeDropdown = this.closeDropdown.bind(this);
    }

    componentDidMount() {
      document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmout() {
      document.removeEventListener('mousedown', this.handleClickOutside);
    }

    openDropdown() {
      this.setState({
        active: true,
      }, () => {
        setTimeout(() => {
          this.dropdown.current.classList.add(styles.showing);
        }, 100);
      });
    }

    handleClickOutside(e) {
      const { active } = this.state;
      if (active && this.dropdown.current.contains(e.target)) {
        return;
      }

      this.closeDropdown(e);
    }

    closeDropdown(e) {
      if (this.dropdown.current) {
        this.dropdown.current.classList.remove(styles.showing);

        setTimeout(() => {
          this.setState({
            active: false,
          });
        }, 200);
      }
    }


    render() {
      const { styleClass, placeholder, ...props } = this.props;
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
          <button type="button" onMouseUp={this.openDropdown}>
            {placeholder || defaultElement}
          </button>
        );
      }

      return (
        <CustomTag className={[styleClass, styles.options].join(' ')}>
          {displayOptions}
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
  };

  Dropdown.defaultProps = {
    styleClass: '',
    placeholder: null,
  };

  return Dropdown;
};

SimpleDropdownComponent.propTypes = {
  WrappedComponent: PropTypes.element.isRequired,
  defaultElement: PropTypes.string.isRequired,
  CustomTag: PropTypes.string.isRequired,
};

export default SimpleDropdownComponent;
