import React from 'react';
import axios from 'axios';
// import SocialMediaFeed from './socialMediaFeed.js';
import { Timeline } from 'react-twitter-widgets';
import Post from './../userTimeline/Post.js';
import sort from './../sort.js';

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
    console.log('component mounted');
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
      // console.log('res from userFeed is ', context.state.allFeed);
    });
  }

  loadMorePhotos() {
    var newFeed = this.state.newFeed
    var remainingFeed = this.state.remainingFeed
    if (remainingFeed.length > 10) {
      for (var i = 0; i < 10; i++) {
        newFeed.push(remainingFeed.shift());
      }
    } else {
      for (var i = 0; i < remainingFeed.length; i++) {
        newFeed.push(remainingFeed.shift());
      }
    }
    this.setState({
      remainingFeed: remainingFeed,
      newFeed: newFeed
    })
  }

  convertDate(date) {
    var converted = new Date(date).toString();
    return converted.slice(4, 10) + ', ' + converted.slice(11, 16);
  }

  render () {
    return (
      <div id="user-feed-container">
        <div id="social-media-feed">
        {/*<Timeline
        dataSource={{
          sourceType: 'list',
          ownerScreenName: 'jackieNPS',
          slug: 'National-Parks'
        }}
        options={{
          username: 'jackieNPS',
          height: '800'
        }}
        onLoad={() => console.log('Timeline is loaded!')}
        />
        */}
        </div>
        {/*<ParklandsUserFeed
          allFeed={context.state.allFeed}
        />*/}

        <div id="all-feed">
          {
            this.state.newFeed.map(feed =>
              <Post
                key={feed.id}
                photoData={feed.filePath}
                datePosted={this.convertDate(feed.createdAt)}
                postId={feed.id}
              />
            )
          }
          <button onClick={this.loadMorePhotos.bind(this)}>Load More Photos</button>
        </div>
      </div>
    );
  }
}
