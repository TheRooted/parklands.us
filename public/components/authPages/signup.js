import React from 'react';
import axios from 'axios';
import { browserHistory, Link } from 'react-router';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  handleSubmit() {
    var user = {
      // firstName: this.refs.firstNameSI.value,
      // lastName: this.refs.lastNameSI.value,
      email: this.refs.emailSU.value,
      password: this.refs.passwordSU.value
    };
    axios.post('/signup', user).then(function(res) {
      if (res.request.responseURL === 'http://localhost:3000/') {
        browserHistory.push('/');
      } else (
        browserHistory.push('/signup'));
    });
  }

  render() {
    return (
      <div className='signupBg'>
        <div className="auth-container signup">
          <input className="auth-fields" type="text" name="firstName" placeholder="First" ref="firstSU" />
          <br />
          <input className="auth-fields" type="text" name="lastName" placeholder="Password" ref="lastSU" />
          <input className="auth-fields" type="email" name="email" placeholder="Email Address" ref="emailSU" />
          <br />
          <input className="auth-fields" type="password" name="password" placeholder="Password" ref="passwordSU" />
          <br />
          <div className="buttons">
            <button className="btn-auth" onClick={this.handleSubmit.bind(this)}>Sign Up</button>
            <Link to="/signin" className="signin-link">Already have an account? Sign in</Link>
          </div>
        </div>
      </div>
    )
  }
}