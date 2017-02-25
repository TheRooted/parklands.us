import React from 'react';
import axios from 'axios';
import SocialMediaFeed from './socialMediaFeed.js';
// import ParklandsUserFeed from './parklandsUserFeed.js';
import Post from './../userTimeline/post.js';

export default class UserFeed extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      allFeed: []
    };
  }

  componentWillMount() {
    const context = this;

    axios.get('/api/userfeed')
    .then(function (res) {
      context.setState({
        allFeed: res.data
      });
      console.log('res from userFeed is ', context.state.allFeed);
    });
  }

  render () {
    return (
      <div id="user-feed-container">
        <h3>Popular Explorations</h3>
        <div id="social-media-feed">
          <SocialMediaFeed />
        </div>
        {/*<ParklandsUserFeed
          allFeed={context.state.allFeed}
        />*/}
        <div id="all-feed">
          {
            this.state.allFeed.map(feed =>
              <Post
                key={feed.id}
                photoData={feed.filePath}
                datePosted={feed.createdAt}
              />
            )
          }
        </div>
      </div>
    );
  }
}
