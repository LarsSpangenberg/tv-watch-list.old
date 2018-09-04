import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';
import Home from './pages/Home';
import 'normalize.css';
import './index.scss';

const App = () => (
  <Provider store={store}>
    <Router>
      <Route exact path="/" component={Home} />
    </Router>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('app'));

if (module.hot) {
  module.hot.accept();
}
