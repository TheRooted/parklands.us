import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import axios from 'axios';

import { Router, Route, browserHistory, IndexRoute} from 'react-router';

import Signin from './authPages/signin.js';
import Signup from './authPages/signup.js';
import UserTimeline from './userTimeline/user_timeline.js';
import Landing from './landing/Landing.js';
import Snp from './snp/Snp.js'
import NotAPark from './snp/NotAPark.js'
import UserFeed from './userFeed/user_Feed.js'

const app = document.getElementById('app');

const isLoggedIn = (nextState, replace) => {
  console.log('checking if user is logged in')

  axios.get('/api/session').then(function(res) {
    console.log('React res.status', res.status)
    console.log('React res', res)
    //TODO: UNCOMMENT ME OUT 
    // if (res.status !== 200) {
    //   browserHistory.push('/signin')
    // }
  });
}

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path='/' component={App} >
      <IndexRoute component={Landing} />
      <Route path='signin' component={Signin} />
      <Route path='signup' component={Signup} />
      <Route path='usertimeline' onEnter={isLoggedIn} component={UserTimeline} />
      <Route path='userfeed' onEnter={isLoggedIn} component={UserFeed} />
      <Route path='park/:parkName' onEnter={isLoggedIn} component={Snp} />
      <Route path='notavalidpark/:parkName' onEnter={isLoggedIn} component={NotAPark}/>
    </Route>

  </Router>), app);
