import React from 'react';
import Like from './Like.js';
import PostComment from './../userFeed/PostComments.js';
import axios from 'axios';
import sort from './../sort.js';
import moment from 'moment';

export default class Post extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      like: 0,
      image: null,
      allComments: [],
      parkId: 'notvalid',
      userId: 1
    };
  }

  componentWillMount() {
    const context = this;
    axios.get('/api/session').then(function (res) {
      context.setState({
        userId: res.data.id
      })
    })
    axios.get('/api/postcomment', {
      params: {
        postId: context.props.postId
      }
    })
    .then(function (res) {
      var sortedRes = sort(res.data, 'activity');
      context.setState({
        allComments: sortedRes
      });
    });
  }

  _handleInputChange(event) {
    this.setState({comment: event.target.value});
  }


  _addComment () {
    var context = this;

    axios.post('/api/postcomment', {
      userId: context.state.userId,
      postId: context.props.postId,
      text: context.state.comment
    })
    .then(function (res) {

      var allComment = [res.data].concat(context.state.allComments);

      context.setState({
        allComments: allComment,
        comment: ''
      });
    });
  }

  render () {
    return (
      <div className="post-container">
        <div className='postDescription'>
          <strong>{`${this.props.firstName} `}</strong>
          <p className="postDate">{moment(this.props.datePosted).format('MMMM Do YYYY')}</p>
          <p className="postDescription"><i>{this.props.description}</i></p>
        </div>
        <img className="timelinePhotoFeed" src={this.props.photoData} />
        <div className="commentline">
          <Like className="likeTimeline" postId={this.props.postId} parkId={this.state.parkId} userId={this.state.userId}/>
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
