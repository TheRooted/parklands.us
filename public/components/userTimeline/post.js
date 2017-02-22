import React from 'react';
import Vote from './upVote.js';

export default class Post extends React.Component {
  constructor(props) {

    super(props);

    this.state = {
      comment: '',
      vote: 0
    };
  }

  render () {
    return (
      <div id="userTimeLineContainer">
        <div id="timeLineFeedContainer">

          <h3>{this.props.datePosted}</h3>
          <img src={this.props.photoData} />
          <Vote />
          <textarea></textarea>
        </div>
      </div>
    );
  }
};
