import React from 'react';
import Validation from 'react-validation';
import validator from 'validator';

export default = {};

Object.assign(Validation.rules, {
  required: {
  // Function to validate value 
  // NOTE: value might be a number -> force to string 
    rule: (value) => {
      return value.toString().trim();
    },
  // Function to return hint 
  // You may use current value to inject it in some way to the hint 
    hint: (value) => {
      return <span className='form-error is-visible'>Required</span>
    }
  },
  email: {
  // Example usage with external 'validator' 
    rule: (value) => {
      return validator.isEmail(value);
    },
    hint: (value) => {
      return <span className='form-error is-visible'>{value} must be a valid email.</span>
    }
  },
  // This example shows a way to handle common task - compare two fields for equality 
  password: {
  // rule function can accept argument: 
  // components - components registered to Form mapped by name 
  rule: (value, components) => {
    const password = components.password.state;
    const passwordConfirm = components.passwordConfirm.state;
    const isBothUsed = password
      && passwordConfirm
      && password.isUsed
      && passwordConfirm.isUsed;
    const isBothChanged = isBothUsed && password.isChanged && passwordConfirm.isChanged;

  if (!isBothUsed || !isBothChanged) {
    return true;
  }

  return password.value === passwordConfirm.value;
  },
  hint: () => <span className="form-error is-visible">Passwords should be equal.</span>
  },
  // Define API rule to show hint after API error response 
  api: {
  // We don't need the rule here because we will call the 'showError' method by hand on API error 
    hint: (value) => (
      <button
        className="form-error is-visible">
        API Error on "{value}" value. Focus to hide.
      </button>
    )
  }
});

