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
      loadMorePhotosStyle: 'inline-block',
      userId: null
    };
  }

  componentWillMount() {
    var context = this;
    axios.get('/api/session').then(function (res) {
      context.setState({
        userId: res.data.id
      })
    })
    axios.get('/api/userfeed')
    .then(function (res) {
      var sortedRes = sort(res.data, 'activity');
      var newFeed = [];
      for (var i = 0; i < context.state.photoCount; i++) {
        newFeed.push(sortedRes.shift());
      }
      if (sortedRes.length === 0) {
        context.setState({loadMorePhotosStyle: 'none'})
      }
      context.setState({
        remainingFeed: sortedRes,
        newFeed: newFeed
      });
    });
  }

  loadMorePhotos() {
    var arrays = loadMore(this.state.photoCount, this.state.newFeed, this.state.remainingFeed);
    if (arrays[1].length === 0) {
      this.setState({loadMorePhotosStyle: 'none'})
    }
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
        <div className='trending-title'>Trending</div>
        <span className='trending-para'>A collection of the community's photos and tweets across all national parks</span>
        <div id="social-media-feed">
          <Timeline
          dataSource={{
            sourceType: 'list',
            ownerScreenName: 'jackieNPS',
            slug: 'National-Parks-Tweets'
          }}
          options={{
            username: 'jackieNPS',
            height: '880'
          }}
          />
        </div>

        <div id="all-feed-trending">
          {
            this.state.newFeed.map((feed,i) =>
              <Post
                key={feed.id}
                photoData={feed.filePath}
                datePosted={this.convertDate(feed.createdAt)}
                allPosts={this.state.newFeed}
                postId={feed.id}
                description={feed.description}
                firstName={feed.firstName}
                index={i}
                view={'trending-view'}
                parkId={feed.parkId}
                length={this.state.newFeed.length}
                userId={this.state.userId}
              />
            )
          }
        </div>
        <button className="btn-auth" onClick={this.loadMorePhotos.bind(this)} >Load More</button>
      </div>
    );
  }
}
