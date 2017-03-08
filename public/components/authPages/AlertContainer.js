import React from 'react';
import AlertContainer from 'react-alert';
 
export default class Alert extends React.Component {
  constructor(props){
    super(props);

    this.state = {};
  }

  alertAddClass() {
    var alertClass = this.props.isShown ? 'alert shown' : 'alert';
    return alertClass;
  }
 
  render(){
    return(
      <div className={ this.alertAddClass() }>
        <span>{ this.props.msg }</span>
      </div>
    );
  }
}