import React from 'react';
import axios from 'axios';
import { browserHistory, Link } from 'react-router';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  validateForm(event) {
    var user = {
      first: this.refs.firstNameSU.value,
      last: this.refs.lastNameSU.value,
      email: this.refs.emailSU.value,
      password: this.refs.passwordSU.value
    }
    // Once first name field is filled
    if (user.first) {
      var el1 = document.getElementById('first-input');
      el1.className = 'auth-fields';
    }
    // Once last name field is filled
    if (user.last) {
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
    if (!user.first) {
      var el1 = document.getElementById('first-input');
      el1.className += ' missing';
      el1.placeholder = 'Please supply a first name.'
      event.preventDefault();
    }
    if (!user.last) {
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
    if (user.first && user.last && user.email && user.password) {
      this.signupRequest(user);
    }
  }

  signupRequest(user) {
    axios.post('/signup', user).then((res) => {
      console.log('in signup res', res)
      if (res.request.responseURL === 'http://localhost:3000/signup' || res.request.responseURL === 'http://127.0.0.1:3000/signup') {
        console.log('Username or password is invalid.')
        browserHistory.push('/signup');
      } else {
        browserHistory.push('/mapview');
      }
    });
  }

  keyPress(event) {
    if (event.key === 'Enter') {
      document.getElementById('signup-submit').click();
    }
  }

  render() {
    return (
      <div className='signupBg'>
        <div className="auth-container signup">
          <input id="first-input" className="auth-fields" type="text" name="firstName" placeholder="First" ref="firstNameSU" />
          <br />
          <input id="last-input" className="auth-fields" type="text" name="lastName" placeholder="Last" ref="lastNameSU" />
          <input id="email-input" className="auth-fields" type="email" name="email" placeholder="Email Address" ref="emailSU" />
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
