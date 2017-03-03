import React from 'react';
import Like from './Like.js';
import PostComment from './../userFeed/PostComments.js';
import axios from 'axios';
import sort from './../sort.js';

export default class Post extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      like: 0,
      image: null,
      allComments: []
    };
  }

  componentWillMount() {
    //console.log('post id ',this.props.postId);
    const context = this;
    axios.get('/api/postcomment', {
      params: {
        postId: context.props.postId
      }
    })
    .then(function (res) {
      context.setState({
        allComments: res.data
      });
    });
  }

  convertDate(date) {
    var converted = new Date(date).toString();
    return converted.slice(4, 10) + ', ' + converted.slice(11, 16);
  }

  _handleInputChange(event) {
    this.setState({comment: event.target.value});
  }


  _addComment () {
    var context = this;
    axios.get('/api/session')
    .then(function(res) {
      var user = res.data;
      console.log('user is ', user);
      axios.post('/api/postcomment', {
        userId: user.id,
        postId: context.props.postId,
        text: context.state.comment
      })
      .then(function (res) {
        console.log('data in add comment is ',res.data);
        var allComment = [res.data].concat(context.state.allComments);
        console.log('data in add comment ALLCOMMENt is ',allComment);
        context.setState({
          allComments: allComment,
          comment: ''
        });
      });
    });
  }

  render () {
    return (
      <div className="post-container">
        <h5>{this.convertDate(this.props.datePosted)}</h5>
        <img className="timelinePhotoFeed" src={this.props.photoData} />
        <div className="commentline">
          <Like className="likeTimeline" postId={this.props.postId}/>
          <textarea
            className="commentTimeline"
            value={this.state.comment}
            onChange={this._handleInputChange.bind(this)}>
          </textarea>
          <button
            className="submitButton"
            onClick={this._addComment.bind(this)}
            >Comment</button>
        </div>
        <PostComment allComments={this.state.allComments} postId={this.props.postId} />
      </div>
    );
  }
};
