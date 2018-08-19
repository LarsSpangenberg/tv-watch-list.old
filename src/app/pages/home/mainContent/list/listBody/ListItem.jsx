import React from 'react';

import styles from './ListItem.scss';

function ListItem(props) {
  return (
    <tr>
      <td className="thumbnail">
        <i className="far fa-image" />
      </td>
      <td className="title">
        <input
          type="text"
          value="Jessica Jones"
        />
      </td>
      <td className="season">
        <input
          type="number"
          value="2"
        />
      </td>
      <td className="episode">
        <input
          type="number"
          value="13"
        /> / 13
      </td>
      <td className="comment">
        <input
          type="text"
          value="finished last season"
        />
      </td>
    </tr>
  );
}

export default ListItem;
