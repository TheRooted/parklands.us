import React from 'react';
import axios from 'axios';
import { browserHistory, Link } from 'react-router';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  validateForm(event) {
    if (!this.refs.firstNameSU.value) {
      var el1 = document.getElementById('first-input');
      el1.className += ' missing';
      el1.placeholder = 'Please supply a first name.'
      event.preventDefault();
    } 
    if (!this.refs.lastNameSU.value) {
      var el2 = document.getElementById('last-input');
      el2.className += ' missing';
      el2.placeholder = 'Please supply a last name.'
      event.preventDefault();
    }
    if (!this.refs.emailSU.value) {
      var el3 = document.getElementById('email-input');
      el3.className += ' missing';
      el3.placeholder = 'Please supply a valid email.';
      event.preventDefault();
    }
    if (!this.refs.passwordSU.value) {
      var el4 = document.getElementById('password-input');
      el4.className += ' missing';
      el4.placeholder = 'Please supply a valid password.'
      event.preventDefault();
    }
    if (this.refs.firstNameSU.value) {
      var el1 = document.getElementById('first-input');
      el1.className = 'auth-fields';
    }
    if (this.refs.lastNameSU.value) {
      var el2 = document.getElementById('last-input');
      el2.className = 'auth-fields';
    }
    if (this.refs.emailSU.value) {
      var el3 = document.getElementById('email-input');
      el3.className = 'auth-fields';
    }
    if (this.refs.passwordSU.value) {
      var el4 = document.getElementById('password-input');
      el4.className = 'auth-fields';
    }
  }

  render() {
    return (
      <div className='signupBg'>
        <form method="post" className="auth-container signup">
          <input id="first-input" className="auth-fields" type="text" name="firstName" placeholder="First" ref="firstNameSU" />
          <br />
          <input id="last-input" className="auth-fields" type="text" name="lastName" placeholder="Last" ref="lastNameSU" />
          <input id="email-input" className="auth-fields" type="email" name="email" placeholder="Email Address" ref="emailSU" />
          <br />
          <input id="password-input" className="auth-fields" type="password" name="password" placeholder="Password" ref="passwordSU" />
          <br />
          <div className="buttons">
            <button className="btn-auth" onClick={ this.validateForm.bind(this) }>Sign Up</button>
            <Link to="/signin" className="signin-link">Already have an account? Sign in</Link>
          </div>
        </form>
      </div>
    )
  }
}
