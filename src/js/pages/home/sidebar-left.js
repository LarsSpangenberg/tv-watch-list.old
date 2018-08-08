import React from 'react';

const SidebarLeft = (props) => {
  return(
    <aside>
      <ul>
        <li>All</li>
        <li>currently watching</li>
        <li>watch later</li>
        <li>completed</li>
      </ul>
      <div>
        <h2>Groups</h2>
        <p>add a group</p>
        <ul>
          <li>Favourites</li>
          <li>Movies</li>
          <li>Netflix Marvel</li>
          <li>Anime</li>
        </ul>
      </div>
    </aside>
  );
};

export default SidebarLeft;
