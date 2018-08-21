import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './ListBody.scss';
// import ListItem from './listBody/ListItem';

class ListBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { children } = this.props;
    return (
      <tbody>
        {children}
      </tbody>
    );
  }
}

ListBody.propTypes = {
  children: PropTypes.node,
};

ListBody.defaultProps = {
  children: '',
};

export default ListBody;
