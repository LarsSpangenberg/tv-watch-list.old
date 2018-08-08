import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Home from './pages/home';
import 'normalize.css';

const App = () => (
  <Router>
    <div>
      <Route exact path='/' component={Home} />
    </div>
  </Router>
);

ReactDOM.render(<App />, document.getElementById('app'));

if (module.hot) {
  module.hot.accept();
}
