import React from 'react';
import axios from 'axios';
//need links from react-router?

export default class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleSubmit() {
    var user = {
      email: this.refs.emailSI.value,
      password: this.refs.passwordSI.value
    }
    axios.post('/signin', user).then(function(res) {
      if (res.data) {
        console.log('successful signin');
      }
    })
  }
  render() {
    return (
      <div className='signinBg'>
        <form method="post">
          <h5>Sign In</h5>
          <input type="email" name="email" placeholder="Email Address" ref="emailSI" />
          <br />
          <input type="password" name="password" placeholder="Password" ref="passwordSI" />
          <br />
          <button type="submit" onClick={this.handleSubmit.bind(this)}>Sign In</button>

        </form>
      </div>
    )
  }
}