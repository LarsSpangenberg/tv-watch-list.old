import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CreateShow from 'components/CreateShow';
import styles from './newItem.scss';
// import ListItem from './listBody/ListItem';

class newItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <tr>
        <td className={styles.addShow} colSpan="10">
          <CreateShow />
        </td>
      </tr>
    );
  }
}

newItem.propTypes = {
};

newItem.defaultProps = {
};

export default newItem;
