import React from 'react';

import styles from './main-content.css';

const MainContent = (props) => {
  return(
    <section className={styles.main}>
      <table className={styles.list}>
        <caption>Favs</caption>
        <tr>
          <th></th>
          <th className="title">Title</th>
          <th className="season">Season</th>
          <th className="episode">Episode</th>
          <th className="comment">Comments</th>
        </tr>
        <tr>
          <td className="thumbnail">
            <i className="far fa-image"></i>
          </td>
          <td className="title">Jessica Jones</td>
          <td className="season">2</td>
          <td className="episode">13/13</td>
          <td className="comment">finished the latest season</td>
        </tr>
        <tr>
          <td className="thumbnail">
            <i className="far fa-image"></i>
          </td>
          <td className="title">Gotham</td>
          <td className="season">4</td>
          <td className="episode">22/22</td>
          <td className="comment">finished the latest season</td>
        </tr>
        <tr>
          <td className="thumbnail">
            <i className="far fa-image"></i>
          </td>
          <td className="title">Legion</td>
          <td className="season">2</td>
          <td className="episode">10/10</td>
          <td className="comment">finished the latest season</td>
        </tr>
      </table>
    </section>
  );
};

console.log(styles);

export default MainContent;
