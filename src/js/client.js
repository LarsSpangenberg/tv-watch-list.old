import React from 'react';
import ReactDOM from 'react-dom';



class App extends React.Component{
  render() {
    return (
      <div>
        <header>
          <div className="branding">
            <h1>Watch List</h1>
            <h2>Never lose track of your TV episodes again!</h2>
          </div>

          <div className="user">
            <i className="fas fa-user"></i>
            <h2>Lazerus</h2>
          </div>
        </header>

        <main>
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

          <aside className="utilities">

          </aside>

        </main>
      </div>
    );
  }
};

ReactDOM.render(<App />, document.getElementById('app'));

if (module.hot) {
  module.hot.accept();
}
