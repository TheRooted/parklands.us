import React from 'react';
import {Component, PropTypes} from 'react';
import Validation from 'react-validation';

export default class SignUpForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  
  render() {
    return (
      <Validation.components.Form>
        <div className="auth-fields">
          <Validation.components.Input type='input' placeholder='Email' name='email' validations={['required', 'email']}/>
        </div>
        <div className="auth-fields">
          <Validation.components.Input type='password' placeholder='Password' name='password' validations={['required', 'password']}/>
        </div>
        <div className="buttons">
          <Validation.components.Button>Sign In</Validation.components.Button>
        </div>
      </Validation.components.Form>
    )
  }
}