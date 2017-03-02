import React, {Component} from 'react';
import axios from 'axios';

export default class Comment extends Component {

  constructor(props) {
    super(props);

    this.state = {
      like: 0,
      comment: [],
      user: ''
    };
  }

  componentWillMount() {
    var context = this;
    axios.get('/api/username', {
      params: {
        userId: context.props.userId
      }
    })
    .then(function (res) {
      console.log('res from comment mount is ', res.data);
      context.setState({
        user: `${res.data.firstName} ${res.data.lastName}`
      });
    });
  }
  render () {
    return (
      <div className="comment-container">
        <strong>{this.state.user}</strong>
        <article>{this.props.text}</article>

        <small>{this.props.userId}</small>
        <small>Post Id is {this.props.postId}</small>
      </div>
    );
  }
}