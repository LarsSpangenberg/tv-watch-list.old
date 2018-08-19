import React from 'react';

import styles from './MainContent.scss';

function MainContent(props) {
  return (
    <section className={styles.main}>
      <table className={styles.list}>
        <caption>Favs</caption>
        <thead>
          <tr>
            <th />
            <th className="title">Title</th>
            <th className="season">Season</th>
            <th className="episode">Episode</th>
            <th className="comment">Comments</th>
          </tr>
        </thead>
        <tbody>

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
      </table>
    </section>
  );
}

export default MainContent;
