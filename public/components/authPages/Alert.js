import React from 'react';

export default class Alert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  alertAddClass() {
    var alertClass = this.props.isShown ? 'alert show' : 'alert';
    return alertClass;
  }

  render() {
    return (
      <div className="alert-message">
        <span>All fields are required.</span>
      </div>
    );
  }
}
