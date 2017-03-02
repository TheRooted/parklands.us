import React, {Component} from 'react';
import axios from 'axios';
import moment from 'moment';

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
      // console.log('res from comment mount is ', res.data);
      context.setState({
        user: res.data
      });
    });
  }

  render () {
    return (
      <div className="comment-container">
        <div className="comment">
          <strong>{`${this.state.user.firstName} ${this.state.user.lastName}`}</strong>
          <article>{this.props.text}</article>
        </div>
          <small>{moment(this.state.user.createdAt).fromNow()}</small>
      </div>
    );
  }
}