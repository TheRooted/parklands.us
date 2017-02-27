import React, {Component} from 'react';
import axios from 'axios';
import Comment from './comment.js';

export default class CommentBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showComments: false,
      comments: []
    };
  }

  componentWillMount() {
    const context = this;
    axios.get('/api/postcomment')
    .then(function (res) {
      context.setState({
        comments: res.data
      });
      console.log('comment list is ', context.state.comments);
    });
  }

  render () {
    const comments = this._getComments();
    return (
      <div className="comment-box">
        {comments}
      </div>
    );
  }

  _getComments() {
    return this.state.comments.map((comment) => {
      return (
        <Comment
          id={comment.id}
          text={comment.text}
          userId={comment.userId}
          postId={comment.postId}
          key={comment.id}
        />
      )
    })
  }
}