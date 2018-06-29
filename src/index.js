import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory as history } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import ReactGA from 'react-ga';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';

import { GA_ID } from './constants';

import stores from './stores';

import App from './App';

import 'material-design-icons/iconfont/material-icons.css';
import './styles/main.scss';

ReactGA.initialize(GA_ID);

configure({
  enforceActions: true
});

ReactDOM.render(
  <Provider {...stores}>
    <BrowserRouter history={history}>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
