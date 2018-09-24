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
      this.closeDropdown = this.closeDropdown.bind(this);
    }

    componentDidMount() {
      document.addEventListener('mousedown', this.closeDropdown, false);
    }

    componentWillUnmout() {
      document.removeEventListener('mousedown', this.closeDropdown, false);
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

    closeDropdown(e) {
      const { active } = this.state;
      if (active && this.dropdown.current.contains(e.target)) {
        return;
      }

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
      const { styleClass, ...props } = this.props;
      const { active } = this.state;

      let placeholder;
      if (defaultElement === 'status') {
        placeholder = props.status;
      } else {
        placeholder = defaultElement;
      }

      let displayOptions;
      if (active) {
        displayOptions = (
          <div className={styles.container}>
            <ul ref={this.dropdown}>
              <WrappedComponent {...props} />
            </ul>
          </div>
        );
      } else {
        displayOptions = (
          <button type="button" onMouseUp={this.openDropdown}>
            {placeholder}
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
  };

  Dropdown.defaultProps = {
    styleClass: '',
  };

  return Dropdown;
};

SimpleDropdownComponent.propTypes = {
  WrappedComponent: PropTypes.element.isRequired,
  defaultElement: PropTypes.string.isRequired,
  CustomTag: PropTypes.string.isRequired,
};

export default SimpleDropdownComponent;
