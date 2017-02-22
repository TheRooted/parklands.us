import React from 'react';
import axios from 'axios';
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
      if (res.data) {
        console.log('successful signup');
      }
    })
  }
  render() {
    return (
      <div>
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