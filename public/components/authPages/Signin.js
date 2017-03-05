import React from 'react';
import axios from 'axios';
import { browserHistory, Link } from 'react-router';


export default class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  validateForm(event) {
    if (!this.refs.emailSI.value) {
      var el3 = document.getElementById('email-input');
      el3.className += ' missing';
      el3.placeholder = 'Please enter your email.';
      event.preventDefault();
    }
    if (!this.refs.passwordSI.value) {
      var el4 = document.getElementById('password-input');
      el4.className += ' missing';
      el4.placeholder = 'Please enter your password.'
      event.preventDefault();
    }
    if (this.refs.emailSI.value) {
      var el3 = document.getElementById('email-input');
      el3.className = 'auth-fields';
    }
    if (this.refs.passwordSI.value) {
      var el4 = document.getElementById('password-input');
      el4.className = 'auth-fields';
    }
  }

  render() {
    return (
      <div className='signinBg'>
        <form method="post" className="auth-container signin">
          <input id="email-input" className="auth-fields" type="email" name="email" placeholder="Email" ref="emailSI" />
          <br />
          <input id="password-input" className="auth-fields" type="password" name="password" placeholder="Password" ref="passwordSI" />
          <br />
          <div className="buttons">
            <button className="btn-auth" onClick={ this.validateForm.bind(this) }>Sign In</button>
            <Link to="/signup" className="signup-link">Don't have an account? Sign up</Link>
          </div>
        </form>
      </div>
    )
  }
}
