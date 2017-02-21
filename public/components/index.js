import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import { Router, Route, browserHistory, IndexRoute} from 'react-router';

import Signin from './landing/signin.js';
import Signup from './landing/signup.js';

const app = document.getElementById('app');

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path='/' component={App} />
    <Route path='signin' component={Signin} />
    <Route path='signup' component={Signup} />

  </Router>), app);
