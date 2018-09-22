import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './CreateOptionsCell.scss';

const CreateOptionsCell = (WrappedComponent, CustomTag, icon) => {
  class Options extends Component {
    constructor(props) {
      super(props);
      this.state = {
        showOptions: false,
      };
      this.onHover = this.onHover.bind(this);
      this.notHovered = this.notHovered.bind(this);
    }

    onHover(e) {
      e.persist();
      setTimeout(() => {
        this.setState({
          showOptions: true,
        });
      }, 200);
    }

    notHovered(e) {
      setTimeout(() => {
        this.setState({
          showOptions: false,
        });
      }, 400);
    }

    render() {
      const { styleClass, ...props } = this.props;
      const { showOptions } = this.state;

      let displayOptions;
      if (showOptions) {
        displayOptions = (
          <ul onMouseLeave={this.notHovered}>
            <WrappedComponent {...props} />
          </ul>
        );
      } else {
        displayOptions = <i className={icon} />;
      }

      return (
        <CustomTag
          className={[styles.options, styleClass].join(' ')}
          onMouseEnter={this.onHover}
        >
          <div className={styles.container}>
            {displayOptions}
          </div>
        </CustomTag>
      );
    }
  }

  Options.propTypes = {
    styleClass: PropTypes.string,
  };

  Options.defaultProps = {
    styleClass: '',
  };

  return Options;
};

CreateOptionsCell.propTypes = {
  WrappedComponent: PropTypes.element.isRequired,
  icon: PropTypes.string.isRequired,
  CustomTag: PropTypes.string.isRequired,
};

export default CreateOptionsCell;
