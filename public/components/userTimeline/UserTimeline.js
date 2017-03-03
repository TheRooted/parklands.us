import React from 'react';
import axios from 'axios';
import Post from './Post.js';
import ImageUpload from './ImageUpload.js';
import sort from './../sort.js';
import loadMore from './../loadMore.js';
export default class UserTimeline extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      photoCount: 10,
      remainingActivity: [],
      displayedActivity: [],
    };
  }

  componentWillMount() {
    const context = this;
    axios.get('/api/userTimeline')
    .then(function (res) {
      var sortedRes = sort(res.data, 'created');
      var newFeed = [];
      for (var i = 0; i < context.state.photoCount; i++) {
        newFeed.push(sortedRes.shift());
      }
      context.setState({
        remainingActivity: sortedRes,
        displayedActivity: newFeed,
      });
      console.log('res from getParkPhotos is ', context.state.userActivity);
    });
  }

  loadMorePhotos() {
    var arrays = loadMore(this.state.photoCount, this.state.displayedActivity, this.state.remainingActivity);
    this.setState({
      displayedActivity: arrays[0],
      remainingActivity: arrays[1],
    });
  }

  render() {
    return (
      <div id="userTimeLinePageContainer">
        <ImageUpload className="ImageUpload" />
        <div className="timeline-post-container">
          {
            this.state.userActivity.map(post =>
              <Post
                photoData={post.filePath}
                datePosted={post.createdAt}
                key={post.id}
                postId={post.id}
                allPost={this.state.userActivity}
              />
            )
          }
          <button onClick={this.loadMorePhotos.bind(this)}>Load More Photos</button>
        </div>
      </div>
    );
  }
};
