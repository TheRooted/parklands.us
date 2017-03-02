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

  convertDate(date) {
    var converted = new Date(date).toString();
    return converted.slice(4, 10) + ', ' + converted.slice(11, 16);
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
        user: res.data
      });
    });
  }
  render () {
    return (
      <div className="comment-container">
        <strong>{`${this.state.user.firstName} ${this.state.user.lastName}`}</strong>
        <article>{this.props.text}</article>
        <small>{this.convertDate(this.state.user.createdAt)}</small>
      </div>
    );
  }
}