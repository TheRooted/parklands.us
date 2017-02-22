import React from 'react';
import axios from 'axios';

export default class UserFeed extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render () {
    return (
      <div id="user-feed-container">
        <div id="popular-Feed-Container">
          <h3>Popular Explorations</h3>
          <div id="current-view"></div>
          <div >
        </div>
        <div id="media-feed-container">

        </div>
      </div>
    );
  }
}