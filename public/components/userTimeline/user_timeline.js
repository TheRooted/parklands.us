import React from 'react';
import Feed from './feed.js';

export default class UserTimeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      userActivity: []
    };
  }

  // renderFeed () {
  //   return
  // }

  render() {
    return (
      <div id="userTimeLinePageContainer">
        <div id="sideBarContainer">
          <h4>{this.state.currentUser}</h4>
          <a href="#">Map</a>
          <a href="#">Donate</a>
        </div>
        <div id="userTimeLineContainer">
          <div id="timeLineFeedContainer">
            <Feed />
          </div>
        </div>
      </div>
    );
  }
};