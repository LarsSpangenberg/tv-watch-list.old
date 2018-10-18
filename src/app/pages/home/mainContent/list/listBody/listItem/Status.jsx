import React, { Component, Fragment, createRef } from 'react';
import PropTypes from 'prop-types';

import SimpleDropdownComponent from 'components/SimpleDropdownComponent';
import { handleEnter } from 'utils/handleKeypress';
import statuses from 'utils/statusArray';
import styles from './Status.scss';

class Status extends Component {
  constructor(props) {
    super(props);
    this.currentStatus = createRef();
    this.handleClick = this.handleClick.bind(this);
    this.handleKeypress = this.handleKeypress.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeypress);
    // setTimeout(() => this.currentStatus.current.focus(), 200);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeypress);
  }

  handleClick(e) {
    const { clickHandler, closeDropdown } = this.props;
    clickHandler(e);
    closeDropdown();
  }

  handleKeypress(e) {
    const el = document.getElementsByClassName(styles.focus)[0];

    const submit = () => this.handleClick(el);

    handleEnter(e.keyCode, submit);
  }

  render() {
    const {
      status,
      closeDropdown,
      generateWeakKey,
    } = this.props;

    const currentI = statuses.indexOf(status);
    const buttons = [
      ...statuses.slice(0, currentI),
      ...statuses.slice(currentI + 1),
    ].map((stat, i) => (
      <li key={generateWeakKey(stat, i + 1)} className={styles.status}>
        <button
          type="button"
          name="status"
          value={stat}
          onClick={this.handleClick}
          tabIndex="-1"
        >
          {stat}
        </button>
      </li>
    ));

    return (
      <Fragment>
        <li key={generateWeakKey(status, 0)} className={styles.status}>
          <button
            type="button"
            name="status"
            value={status}
            onClick={closeDropdown}
            ref={this.currentStatus}
          >
            {status}
          </button>
        </li>
        {buttons}
      </Fragment>
    );
  }
}

Status.propTypes = {
  status: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
  closeDropdown: PropTypes.func.isRequired,
  generateWeakKey: PropTypes.func.isRequired,
};

const style = {
  focus: styles.focus,
};
export default SimpleDropdownComponent(Status, 'td', null, style);
