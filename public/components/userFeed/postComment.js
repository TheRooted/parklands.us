import React, {Component} from 'react';
import axios from 'axios';
import Comment from './comment.js';

export default class PostComment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showComments: false
    };
  }

  // componentWillMount() {
  //   //console.log('post id ',this.props.postId);
  //   const context = this;
  //   axios.get('/api/postcomment', {
  //     params: {
  //       postId: context.props.postId
  //     }
  //   })
  //   .then(function (res) {
  //     context.setState({
  //       comments: res.data
  //     });
  //     //console.log('comment list is ', context.state.comments);
  //   });
  // }

  render () {
    const comments = this._getComments();
    return (
      <div className="comment-box">
        <div>
          {comments}
        </div>
      </div>
    );
  }

  _getComments() {
    return this.props.allComments.map((comment) => {
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