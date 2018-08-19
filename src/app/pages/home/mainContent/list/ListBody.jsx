import React, { Component } from 'react';

import styles from './ListBody.scss';
import ListItem from './listBody/ListItem';

class ListBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <tbody>

        <ListItem />

        <tr>
          <td className="thumbnail">
            <i className="far fa-image" />
          </td>
          <td className="title">Gotham</td>
          <td className="season">4</td>
          <td className="episode">22/22</td>
          <td className="comment">finished the latest season</td>
        </tr>
        <tr>
          <td className="thumbnail">
            <i className="far fa-image" />
          </td>
          <td className="title">Legion</td>
          <td className="season">2</td>
          <td className="episode">10/10</td>
          <td className="comment">finished the latest season</td>
        </tr>
      </tbody>
    );
  }
}

export default ListBody;
