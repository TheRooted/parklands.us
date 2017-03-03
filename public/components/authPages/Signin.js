import React from 'react';
import axios from 'axios';
import { browserHistory, Link } from 'react-router';


export default class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  validateForm() {
    var user = {
      email: this.refs.emailSI.value,
      password: this.refs.passwordSI.value
    }

    if (!user.email || !user.password) {
      alert('Please fill in all fields so we can connect you to your parks!');
    }
  }

  render() {
    return (
      <div className='signinBg'>
        <form method="post" className="auth-container signin">
          <input className="auth-fields" type="email" name="email" placeholder="Email Address" ref="emailSI" />
          <br />
          <input className="auth-fields" type="password" name="password" placeholder="Password" ref="passwordSI" />
          <br />
          <div className="buttons">
            <button className="btn-auth" onClick={this.validateForm.bind(this)}>Sign In</button>
            <Link to="/signup" className="signup-link">Don't have an account? Sign up</Link>
          </div>
        </form>
      </div>
    )
  }
}
