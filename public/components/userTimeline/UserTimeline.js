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
    });
  }

  loadMorePhotos() {
    var arrays = loadMore(this.state.photoCount, this.state.displayedActivity, this.state.remainingActivity);
    this.setState({
      displayedActivity: arrays[0],
      remainingActivity: arrays[1],
    });
  }

  addPhoto() {
    const context = this;
    axios.get('/api/userTimeline').then(function (res) {
      var sortedRes = sort(res.data, 'created');
      var newFeed = context.state.displayedActivity.slice();
      var newElement = sortedRes.shift();
      newFeed.unshift(newElement);
      context.setState({
        displayedActivity: newFeed
      })
    })
  }

  render() {
    return (
      <div id="userTimeLinePageContainer">
        <ImageUpload className="ImageUpload" addPhoto={this.addPhoto.bind(this)}/>
        <div className="timeline-post-container">
          {
            this.state.displayedActivity.map(post =>
              <Post
                photoData={post.filePath}
                datePosted={post.createdAt}
                key={post.id}
                postId={post.id}
                allPost={this.state.displayedActivity}
              />
            )
          }
          <button onClick={this.loadMorePhotos.bind(this)}>Load More Photos</button>
        </div>
      </div>
    );
  }
};
