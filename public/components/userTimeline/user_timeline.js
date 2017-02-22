import React from 'react';
import axios from 'axios';
import Post from './post.js';
import Sidebar from './sidebar.js';
import ImageUpload from './imagePost.js';

export default class UserTimeline extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      userActivity: []
    };
  }

  componentWillMount() {
    const context = this;

    axios.get('/api/userTimeline')
    .then(function (res) {
      context.setState({
        userActivity: res.data
      });
      console.log('res from getParkPhotos is ', context.state.userActivity);
    });
  }
  // renderFeed () {
  //   return
  // }

  render() {
    return (
      <div id="userTimeLinePageContainer">
        <Sidebar />
        <div>
          <ImageUpload />
          <div>
            {
              this.state.userActivity.map(activity =>
                <Post
                  photoData={activity.photoUrl}
                  datePosted={activity.createdAt}
                  key={activity.id}
                />
              )
            }
          </div>
        </div>
      </div>
    );
  }
};
