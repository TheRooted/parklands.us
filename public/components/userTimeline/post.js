import React from 'react';
import Like from './like.js';
import CommentBox from './../userFeed/postComment.js';

export default class Post extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      like: 0,
      image: null
    };
  }

  render () {
    return (
      <div className="post-container">
        <h5>{this.props.datePosted}</h5>
        <img className="timelinePhotoFeed" src={this.props.photoData} />
        <Like className="likeTimeline"/>
        <textarea className="commentTimeline"></textarea>
        <button className="submitButton">Comment</button>
      </div>
    );
  }
};
