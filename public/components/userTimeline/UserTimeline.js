import React from 'react';
import axios from 'axios';
import Post from './Post.js';
import ImageUpload from './ImageUpload.js';
import sort from './../sort.js';

export default class UserTimeline extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      userActivity: [],
    };
  }

  componentWillMount() {
    const context = this;
    axios.get('/api/userTimeline')
    .then(function (res) {
      var sortedRes = sort(res.data, 'created');
      var newFeed = [];
      for (var i = 0; i < 10; i++) {
        newFeed.push(sortedRes[i]);
      }
      context.setState({
        userActivity: newFeed
      });
      console.log('res from getParkPhotos is ', context.state.userActivity);
    });
  }

  loadMorePhotos() {
    var newFeed = this.state.newFeed;
    var remainingFeed = this.state.remainingFeed;
    var photosToLoad = 10;
    if (remainingFeed.length > photosToLoad) {
      for (var i = 0; i < photosToLoad; i++) {
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
              />
            )
          }
          <button onClick={this.loadMorePhotos.bind(this)}>Load More Photos</button>
        </div>
      </div>
    );
  }
};
