import React, {Component} from 'react';

export default class Comment extends Component {

  constructor(props) {
    super(props);

    this.state = {
      like: 0,
      comment: []
    };
  }

  render () {
    return (
      <div className="comment-container">
        <article>{this.props.text}</article>
        <small>{this.props.userId}</small>
      </div>
    );
  }
}