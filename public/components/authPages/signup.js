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
    }
    axios.post('/signup', user).then(function(res) {
      console.log('signup component res', res)
      if (res.status === 204) {
        // send to signin page
        browserHistory.push('/signin');
      } else if (res.status === 401) {
        // email recognized, but pw doesn't match; try again
        browserHistory.push('/signup');
      } else if (res.status === 201) {
        console.log('successful signup');
        // successful signup, send to landing page
        browserHistory.push('/');
      }
    })
  }
  render() {
    return (
      <div className='signupBg'>
        <form method="post">
          <h5>Sign Up</h5>
          <input type="text" name="firstName" placeholder="First Name" ref="firstNameSI" />
          <br />
          <input type="text" name="lastName" placeholder="Last Name" ref="lastNameSI" />
          <br />
          <input type="email" name="email" placeholder="Email Address" ref="emailSI" />
          <br />
          <input type="password" name="password" placeholder="Password" ref="passwordSI" />
          <br />
          <button type="submit" onClick={this.handleSubmit.bind(this)}>Sign Up</button>

        </form>
      </div>
    )
  }
}