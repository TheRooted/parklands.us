import React from 'react';
import { browserHistory } from 'react-router';

export default class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  linkToMapView() {
    browserHistory.push('/mapview');
  }

  render() {
    return (
      <div className="landing-div">
        <div className='splash-landing'>
          <img className='splash-img' onClick={this.linkToMapView.bind(this)} src='https://www.adventure-journal.com/wp-content/uploads/2015/07/15155461297_402eeb3fd7_h.jpg' />
          <div className='splash-title' onClick={this.linkToMapView.bind(this)}>START EXPLORING</div>
        </div>
        
      </div>
    )
  }
}
