import React from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';
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
      console.log('made it back to axios!', res.status)

      if (res.status === 200) {
        console.log('res.status', res.status)
        browserHistory.push('/park/yosemite');

      } else if (res.status === 400) {
        console.log('status 400')
      }
    });
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