import React from 'react';
import axios from 'axios';


class ReviewCommentBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userReview: ''
    }
  }

  postReview () {
    console.log('clicked button', this.state.userReview)
    // grab the data from input form
    var userReviewObj = {
      userReview: this.state.userReview,
      userId: this.props.userId,
      parkId: this.props.parkId
    }
    // axios request to server..
    axios.get('/api/parkReview', userReviewObj)

  };

  handleChange (event) {
    this.setState({userReview: event.target.value})
  }

render () {
  return (
    <div>
      <textarea className="textarea-review" value={this.state.userReview} placeholder="Share your experience here..." rows="7" cols="50"
        onChange={this.handleChange.bind(this)} >
      </textarea>
      <br />
      <button className="btn-review" onClick={this.postReview.bind(this)}>Post</button>
    </div>
  )}
}


export default ReviewCommentBox;
