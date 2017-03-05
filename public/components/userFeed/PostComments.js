import React, {Component} from 'react';
import axios from 'axios';
import Comment from './Comment.js';

const PostComment = (props) => {
    // const comments = this._getComments();
  console.log('all comment iss ',props.allComments);
  return (
    <div className="comment-box">
        {
          props.allComments.map((comment) => {
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
  );
}

module.exports = PostComment;
