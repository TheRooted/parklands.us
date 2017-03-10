import React from 'react';
import axios from 'axios';
import { browserHistory, Link } from 'react-router';
import AlertContainer from './AlertContainer';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alertShown: false
    };
  }
  
  validateForm(event) {
    var user = {
      firstName: this.refs.firstNameSU.value,
      lastName: this.refs.lastNameSU.value,
      email: this.refs.emailSU.value,
      password: this.refs.passwordSU.value
    }
    // Once first name field is filled
    if (user.firstName) {
      var el1 = document.getElementById('first-input');
      el1.className = 'auth-fields';
    }
    // Once last name field is filled
    if (user.lastName) {
      var el2 = document.getElementById('last-input');
      el2.className = 'auth-fields';
    }
    // Once email field is filled
    if (user.email) {
      var el3 = document.getElementById('email-input');
      el3.className = 'auth-fields';
    }
    // Once password field is filled
    if (user.password) {
      var el4 = document.getElementById('password-input');
      el4.className = 'auth-fields';
    }
    if (!user.firstName) {
      var el1 = document.getElementById('first-input');
      el1.className += ' missing';
      el1.placeholder = 'Please supply a first name.'
      event.preventDefault();
    }
    if (!user.lastName) {
      var el2 = document.getElementById('last-input');
      el2.className += ' missing';
      el2.placeholder = 'Please supply a last name.'
      event.preventDefault();
    }
    if (!user.email) {
      var el3 = document.getElementById('email-input');
      el3.className += ' missing';
      el3.placeholder = 'Please supply a valid email.';
      event.preventDefault();
    }
    if (!user.password) {
      var el4 = document.getElementById('password-input');
      el4.className += ' missing';
      el4.placeholder = 'Please supply a valid password.'
      event.preventDefault();
    }
    if (user.firstName && user.lastName && user.email && user.password) {
      this.signupRequest(user);
    }
  }

  showAlert() {
    this.setState({ alertShown: !this.state.alertShown})
  }

  signupRequest(user) {
    axios.post('/signup', user).then((res) => {
      //LIVE FIXME: make sure 'http://parklands.us/signup' is an option below
      if (res.request.responseURL === 'http://localhost:3000/signup' || res.request.responseURL === 'http://127.0.0.1:3000/signup' || res.request.responseURL === 'http://parklands.us/signup' || res.request.responseURL === 'http://www.parklands.us/signup') {
        this.showAlert();
      } else {
        browserHistory.push('/explore');
      }
    });
  }

  keyPress(event) {
    if (event.key === 'Enter') {
      document.getElementById('signup-submit').click();
    }
  }

  render() {

    var alertMessage = 'Looks like you already have an account! Please sign in.';

    return (
      <div className='signupBg'>
        <div className="auth-container signup">
          <AlertContainer isShown={this.state.alertShown} msg={ alertMessage } />
          <input id="first-input" className="auth-fields" type="text" name="firstName" placeholder="First" ref="firstNameSU" />
          <br />
          <input id="last-input" className="auth-fields" type="text" name="lastName" placeholder="Last" ref="lastNameSU" />
          <input id="email-input" className="auth-fields" type="email" name="email" placeholder="Email" ref="emailSU" />
          <br />
          <input id="password-input" className="auth-fields" type="password" name="password" placeholder="Password" ref="passwordSU" onKeyDown={ this.keyPress.bind(this) } />
          <br />
          <div className="buttons">
            <button id="signup-submit" className="btn-auth" onClick={ this.validateForm.bind(this) }>Sign Up</button>
            <Link to="/signin" className="signin-link">Already have an account? Sign in</Link>
          </div>
        </div>
      </div>
    )
  }
}
