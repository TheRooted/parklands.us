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

  convertDate(date) {
    var converted = new Date(date).toString();
    return converted.slice(4, 10) + ', ' + converted.slice(11, 16);
  }

  render () {
    return (
      <div className="post-container">
        <h5>{this.convertDate(this.props.datePosted)}</h5>
        <img className="timelinePhotoFeed" src={this.props.photoData} />
        <div className="commentline">
          <Like className="likeTimeline"/>
          <textarea className="commentTimeline"></textarea>
          <button className="submitButton">Comment</button>
        </div>
        <CommentBox postId={this.props.postId} />
      </div>
    );
  }
};
