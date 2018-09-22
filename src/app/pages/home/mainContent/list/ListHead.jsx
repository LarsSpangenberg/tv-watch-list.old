import React from 'react';

import styles from './ListHead.scss';
import ColumnSettings from './listHead/ColumnSettings';

function ListHead(props) {
  return (
    <thead>
      <tr>
        <th />
        <th className="title">Title</th>
        <th className="season">Season</th>
        <th className="episode">Episode</th>
        <th className="comment">Comments</th>
        <th className="tags">Tags</th>
        <th className="status">Status</th>
        <ColumnSettings />
      </tr>
    </thead>
  );
}

export default ListHead;
