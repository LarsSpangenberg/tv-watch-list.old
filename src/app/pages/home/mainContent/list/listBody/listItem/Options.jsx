import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Options extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showOptions: false,
      x: 0,
      y: 0,
    };
    this.displayOptions = this.displayOptions.bind(this);
    this.onHover = this.onHover.bind(this);
    this.notHovered = this.notHovered.bind(this);
  }

  onHover(e) {
    e.persist();
    setTimeout(() => {
      const targetCoords = e.target.getBoundingClientRect();
      this.setState({
        showOptions: true,
        x: `${targetCoords.x}px`,
        y: `${targetCoords.y}px`,
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

  displayOptions() {
    const { showOptions, x, y } = this.state;
    const optionsCoords = {
      top: y,
      left: x,
    };
    if (showOptions) {
      return (
        <ul style={optionsCoords} onMouseLeave={this.notHovered}>
          <li>
            <button type="button">
              Add Row for this Title
            </button>
          </li>
          <li>
            <button type="button">
              Add another Show
            </button>
          </li>
        </ul>
      );
    }
    return <i className="fas fa-ellipsis-v" />;
  }

  render() {
    const { styleClass } = this.props;
    return (
      <td
        className={styleClass}
        onMouseEnter={this.onHover}
      >
        {this.displayOptions()}
      </td>
    );
  }
}

Options.propTypes = {
  styleClass: PropTypes.string,
};

Options.defaultProps = {
  styleClass: '',
};

export default Options;
