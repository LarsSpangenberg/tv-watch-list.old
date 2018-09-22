import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Status.scss';

class Status extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDropdown: false,
      x: 0,
      y: 0,
    };
    this.onHover = this.onHover.bind(this);
    this.notHovered = this.notHovered.bind(this);
  }

  onHover(e) {
    e.persist();
    setTimeout(() => {
      const targetCoords = e.target.getBoundingClientRect();
      this.setState({
        showDropdown: true,
        x: `${targetCoords.x}px`,
        y: `${targetCoords.y}px`,
      });
    }, 200);
  }

  notHovered(e) {
    setTimeout(() => {
      this.setState({
        showDropdown: false,
      });
    }, 400);
  }

  render() {
    const {
      styleClass,
      status,
      clickHandler,
      generateWeakKey,
    } = this.props;
    const { showDropdown, x, y } = this.state;
    const dropdownPosition = { top: y, left: x };

    let displayStatus;
    if (showDropdown) {
      const allStatuses = ['current', 'completed', 'watch later', 'on hold', 'dropped'];
      const buttons = allStatuses.filter(stat => (
        stat !== status
      )).map((stat, i) => (
        <li key={generateWeakKey(stat, i + 1)}>
          <button
            type="button"
            name="status"
            value={stat}
            onClick={clickHandler}
          >
            {stat}
          </button>
        </li>
      ));

      // ensures active status is first on the list
      displayStatus = (
        <ul style={dropdownPosition} onMouseLeave={this.notHovered}>
          <li key={generateWeakKey(status, 0)}>
            <button
              type="button"
              name="status"
              value={status}
            >
              {status}
            </button>
          </li>
          {buttons}
        </ul>
      );
    }

    return (
      <td className={[styleClass, styles.status].join(' ')}>
        <div onMouseEnter={this.onHover}>
          {status}
        </div>
        {displayStatus}
      </td>
    );
  }
}

Status.propTypes = {
  styleClass: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
  generateWeakKey: PropTypes.func.isRequired,
};

export default Status;
