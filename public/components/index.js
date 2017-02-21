import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';

import { Router, Route, browserHistory, IndexRoute} from 'react-router';

import Signin from './landing/signin.js';
import Signup from './landing/signup.js';
import UserTimeline from './userTimeline/user_timeline.js';
import Landing from './landing/Landing.js';
import Snp from './snp/Snp.js'

const app = document.getElementById('app');

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path='/' component={App} >
      <IndexRoute component={Landing} />
      <Route path='signin' component={Signin} />
      <Route path='signup' component={Signup} />
      <Route path='userTimeline' component={UserTimeline} />
      <Route path='park/:parkName' component={Snp}/>
    </Route>

  </Router>), app);
