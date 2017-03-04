import React from 'react';
import Alert from './Alert.js';

export default class AlertHandler extends React.Component {
  constructor(props) {
    super(props);
    this.state = { alertShown: false };
  }

  // check if alert is showing
  showAlert() {
    this.setState({ alertShown: !this.state.alertShown })
  }

  render() {
    return (
      <div className='alert-handler'>
        <Alert isShown={ this.state.alertShown } showAlert={this.showAlert.bind(this)}/>
      </div>
    )
  }
}

