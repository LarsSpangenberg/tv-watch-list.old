import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './ListBody.scss';
import ListItem from './listBody/ListItem';
import showsType from 'types';

class ListBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { shows } = this.props;
    let listItems = '';

    if (shows) {
      listItems = shows.map(show => (
        <ListItem
          title={show.title}
          currentSeason={parseInt(show.currentSeason)}
          currentEpisode={parseInt(show.currentEpisode)}
          comments={show.comments}
          status={show.status}
          lists={show.tags}
          data={show.data}
        />
      ));
    }

    return (
      <tbody>
        {listItems}
        <tr>
          <td className={styles.addShow} colSpan="10">
            <button type="button">
              <i className="fas fa-plus" />
            </button>
          </td>
        </tr>
      </tbody>
    );
  }
}

ListBody.propTypes = {
  shows: showsType,
};

ListBody.defaultProps = {
  shows: [],
};

export default ListBody;
