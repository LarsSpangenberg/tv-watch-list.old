import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './pages/Home';
import 'normalize.css';
import './Index.scss';

const App = () => (
  <Router>
    <Route exact path="/" component={Home} />
  </Router>
);

ReactDOM.render(<App />, document.getElementById('app'));

if (module.hot) {
  module.hot.accept();
}
