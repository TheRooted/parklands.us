import React from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';
//need links from react-router?

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  handleSubmit() {
    var user = {
      firstName: this.refs.firstNameSI.value,
      lastName: this.refs.lastNameSI.value,
      email: this.refs.emailSI.value,
      password: this.refs.passwordSI.value
    };
    axios.post('/signup', user).then(function(res) {
      if (res.status === 200) {
        browserHistory.push('/');
      } else if (res.status === 400) {
        browserHistory.push('/signup');
      }
    });
  }

  render() {
    return (
      <div className='signupBg'>
        <input className="auth-fields" type="text" name="firstName" placeholder="First Name" ref="firstNameSI" />
        <br />
        <input className="auth-fields" type="text" name="lastName" placeholder="Last Name" ref="lastNameSI" />
        <br />
        <input className="auth-fields" type="email" name="email" placeholder="Email Address" ref="emailSI" />
        <br />
        <input className="auth-fields" type="password" name="password" placeholder="Password" ref="passwordSI" />
        <br />
        <button onClick={this.handleSubmit.bind(this)}>Sign Up</button>
      </div>
    )
  }
}