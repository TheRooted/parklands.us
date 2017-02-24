import React from 'react';
import axios from 'axios';
import SocialMediaFeed from './socialMediaFeed.js'

export default class UserFeed extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render () {
    return (
      <div id="user-feed-container">
        <h3>Popular Explorations</h3>
        <SocialMediaFeed />
        <div id="current-view"></div>
        <div id="media-feed-container"></div>
      </div>
    );
  }
}