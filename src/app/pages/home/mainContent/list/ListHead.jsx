import React from 'react';

import styles from './ListHead.scss';

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
        <th className="columnSettings"><i className="fas fa-cog" /></th>
      </tr>
    </thead>
  );
}

export default ListHead;
