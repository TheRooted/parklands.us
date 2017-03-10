import React, {Component} from 'react';
import axios from 'axios';
import Comment from './Comment.js';

class PostComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: this.props.allComments,
      parkId: this.props.parkId,
    }
  }

    // const comments = this._getComments();
  componentWillReceiveProps(nextProps) {
    this.setState({comments: nextProps.allComments});
  }

  render () {
    return (
      <div className={this.props.commentStyle ? this.props.commentStyle : (this.props.view === 'trending-view') ? 'comment-box-trending' : 'comment-box'}>
          {
            this.state.comments.map((comment) => {
              return (
                <Comment
                  id={comment.id}
                  text={comment.text}
                  userId={comment.userId}
                  postId={comment.postId}
                  key={comment.id}
                  dateTime={comment.createdAt}
                />
              )
            })
          }
      </div>
    )
  };
}

module.exports = PostComment;
