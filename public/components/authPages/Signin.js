import React from 'react';
import axios from 'axios';
import { browserHistory, Link } from 'react-router';
import AlertContainer from './AlertContainer';

export default class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alertShown: false
    };
  }
  
  validateForm(event) {
    var user = {
      email: this.refs.emailSI.value,
      password: this.refs.passwordSI.value
    }

    // Once email field is filled correctly
    if (user.email) {
      var el3 = document.getElementById('email-input');
      el3.className = 'auth-fields';
    }
    // Once password field is filled correctly
    if (user.password) {
      var el4 = document.getElementById('password-input');
      el4.className = 'auth-fields';
    }
    // If email field is left blank
    if (!user.email) {
      var el3 = document.getElementById('email-input');
      el3.className += ' missing';
      el3.placeholder = 'Please enter your email.';
    } 
    // If password field is left blank
    if (!user.password) {
      var el4 = document.getElementById('password-input');
      el4.className += ' missing';
      el4.placeholder = 'Please enter your password.'
    }
    // All fields have values; validate user credentials
    if (user.email && user.password) {
      this.signinRequest(user);
    }
  }

  showAlert() {
    this.setState({ alertShown: !this.state.alertShown})
  }

  signinRequest(user) {
    axios.post('/signin', user).then((res) => {
      //LIVE FIXME: make sure 'http://parklands.us/signin' is an option below
      if (res.request.responseURL === 'http://localhost:3000/signin' || res.request.responseURL === 'http://127.0.0.1:3000/signin' || res.request.responseURL === 'http://parklands.us/signin') {
        this.showAlert();
      } else {
        browserHistory.push('/explore');
      }
    });
  }

  keyPress(event) {
    if (event.key === 'Enter') {
      document.getElementById('signin-submit').click();
    }
  }

  render() {

    var alertMessage = 'Email or password went awry!  Try again.'

    return (
      <div className='signinBg'>
        <div className="auth-container signin">
          <AlertContainer isShown={ this.state.alertShown } msg={ alertMessage } />
          <input id="email-input" className="auth-fields" type="email" name="email" placeholder="Email" ref="emailSI" />
          <br />
          <input id="password-input" className="auth-fields" type="password" name="password" placeholder="Password" ref="passwordSI" onKeyDown={ this.keyPress.bind(this) } />
          <br />
          <div className="buttons">
            <button type="submit" id="signin-submit" className="btn-auth" onClick={ this.validateForm.bind(this) }>Sign In</button>
            <Link to="/signup" className="signup-link">Don't have an account? Sign up</Link>
          </div>
        </div>
      </div>
    )
  }
}
