import React from 'react';
import axios from 'axios';
import SocialMediaFeed from './socialMediaFeed.js';
import { Timeline } from 'react-twitter-widgets';
import Post from './../userTimeline/Post.js';
import sort from './../sort.js';
import loadMore from './../loadMore.js';

export default class UserFeed extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      remainingFeed: [],
      photoCount: 10,
      newFeed: [],
    };
  }

  componentWillMount() {
    var context = this;

    axios.get('/api/userfeed')
    .then(function (res) {
      var sortedRes = sort(res.data, 'activity');
      var newFeed = [];
      for (var i = 0; i < context.state.photoCount; i++) {
        newFeed.push(sortedRes.shift());
      }
      context.setState({
        remainingFeed: sortedRes,
        newFeed: newFeed
      });
    });
  }

  loadMorePhotos() {
    var arrays = loadMore(this.state.photoCount, this.state.newFeed, this.state.remainingFeed);
    this.setState({
      newFeed: arrays[0],
      remainingFeed: arrays[1],
    });
  }

  convertDate(date) {
    var converted = new Date(date).toString();
    return converted.slice(4, 10) + ', ' + converted.slice(11, 16);
  }

  render () {
    return (
      <div className="user-feed-container">
        <div id="social-media-feed">
          <Timeline
          dataSource={{
            sourceType: 'list',
            ownerScreenName: 'jackieNPS',
            slug: 'National-Parks'
          }}
          options={{
            username: 'jackieNPS',
            height: '880'
          }}
          />
        </div>

        <div id="all-feed">
          {
            this.state.newFeed.map(feed =>
              <Post
                key={feed.id}
                photoData={feed.filePath}
                datePosted={this.convertDate(feed.createdAt)}
                postId={feed.id}
                description={feed.description}
              />
            )
          }
          <button onClick={this.loadMorePhotos.bind(this)}>Load More Photos</button>
        </div>
      </div>
    );
  }
}
