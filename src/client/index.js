import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import App from './app';
import { APP_CONTAINER_SELECTOR } from '../shared/config';

import Landing from './Landing';
import Main from './Main';

const rootEl = document.querySelector(APP_CONTAINER_SELECTOR);

const wrapApp = AppComponent =>

  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <Route path='/landing' component={Landing} />
      <Route path='/main' component={Main} />
    </Route>
  </Router>


ReactDOM.render(wrapApp(App), rootEl);

if (module.hot) {
  module.hot.accept('./app', () => {
    // eslint-disable-next-line global-require
    const NextApp = require('./app').default;
    ReactDOM.render(wrapApp(NextApp), rootEl);
  });
}
