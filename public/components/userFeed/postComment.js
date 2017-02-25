import React, {Component} from 'react';
import axios from 'axios';

export default class CommentBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showComments: false,
      comments: []
    };
  }

  render () {
    //const comments = this._getComments();
    return (
      <div className="comment-box">
        <div>

        </div>
      </div>
    );
  }

  // _getComments() {
  //   return this.state.comments.map((comment) => {
  //     return (
  //       <Comment
  //         id: {comment.id}
  //         text: {comment.text}
  //         userId: {comment.userId}
  //         postId: {postId}
  //         key: {comment.id}
  //       />
  //     )
  //   })
  // }
}