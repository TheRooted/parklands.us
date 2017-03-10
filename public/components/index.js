import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import axios from 'axios';

import { Router, Route, browserHistory, IndexRoute} from 'react-router';

import Signin from './authPages/Signin.js';
import Signup from './authPages/Signup.js';
import UserTimeline from './userTimeline/UserTimeline.js';
import Landing from './landing/Landing.js';
import Snp from './snp/Snp.js';
import NotAPark from './snp/NotAPark.js';
import UserFeed from './userFeed/UserFeed.js';
import Explore from './mapview/Explore.js';

const app = document.getElementById('app');

const isLoggedIn = (nextState, replace) => {

  axios.get('/api/session').then(function(res) {
    if (res.status !== 200) {
      browserHistory.push('/signin')
    }
  });
};

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path='/' component={App} >
      <IndexRoute component={Landing} />
      <Route path='explore' component={Explore} />
      <Route path='signin' component={Signin} />
      <Route path='signup' component={Signup} />
      <Route path='profile' onEnter={isLoggedIn} component={UserTimeline} />
      <Route path='trending' onEnter={isLoggedIn} component={UserFeed} />
      <Route path='park/:parkName' onEnter={isLoggedIn} component={Snp} />
      <Route path='notavalidpark/:parkName' onEnter={isLoggedIn} component={NotAPark}/>
    </Route>

  </Router>), app);
