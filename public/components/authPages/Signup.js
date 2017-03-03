import React from 'react';
import axios from 'axios';
import { browserHistory, Link } from 'react-router';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  validateForm() {
    var user = {
      firstName: this.refs.firstNameSU.value,
      lastName: this.refs.lastNameSU.value,
      email: this.refs.emailSU.value,
      password: this.refs.passwordSU.value
    }

    if (!user.firstName || !user.lastName || !user.email || !user.password) {
      alert('Please fill in all fields so we can connect you to your parks!');
    }
  }

  render() {
    return (
      <div className='signupBg'>
        <form method="post" className="auth-container signup">
          <input className="auth-fields" type="text" name="firstName" placeholder="First" ref="firstNameSU" />
          <br />
          <input className="auth-fields" type="text" name="lastName" placeholder="Last" ref="lastNameSU" />
          <input className="auth-fields" type="email" name="email" placeholder="Email Address" ref="emailSU" />
          <br />
          <input className="auth-fields" type="password" name="password" placeholder="Password" ref="passwordSU" />
          <br />
          <div className="buttons">
            <button className="btn-auth" onClick={this.validateForm.bind(this)}>Sign Up</button>
            <Link to="/signin" className="signin-link">Already have an account? Sign in</Link>
          </div>
        </form>
      </div>
    )
  }
}
