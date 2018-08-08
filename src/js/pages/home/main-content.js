import React from 'react';

const MainContent = (props) => {
  return(
    <section>
      <table className="group">
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

export default MainContent;
