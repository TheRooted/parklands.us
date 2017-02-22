import React from 'react';
import Like from './like.js';
import ImagePost from './imagePost.js';

export default class Post extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      vote: 0,
      image: null
    };
  }

  render () {
    return (
      <div id="userTimeLineContainer">
        <div id="timeLineFeedContainer">

          <h3>{this.props.datePosted}</h3>
          <img src={this.props.photoData} />
          <Like />
          <textarea></textarea>
          <ImageUpload />
        </div>
      </div>
    );
  }
};
