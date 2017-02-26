import React from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';


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
      if (res.status === 200) {
        browserHistory.push('/');
      } else if (res.status === 400) {
        browserHistory.push('/signup');
      }
    });
  }

  render() {
    return (
      <div className='signinBg'>
        <div className="auth-container">
          <input className="auth-fields" type="email" name="email" placeholder="Email Address" ref="emailSI" />
          <br />
          <input className="auth-fields" type="password" name="password" placeholder="Password" ref="passwordSI" />
          <br />
          <button className="btn-auth" onClick={this.handleSubmit.bind(this)}>Sign In</button>
          <Link to="signup" className="signup-link">No account? Sign up</Link>
        </div>
      </div>
    )
  }
}