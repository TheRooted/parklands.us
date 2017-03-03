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
    console.log('clicked button')
    var context = this;
    // grab the data from input form
    var userReviewObj = {
      userReview: context.state.userReview,
      userId: context.props.userId,
      parkId: context.props.parkId,
      userEmail: context.props.userEmail,
      firstName: context.props.firstName
    }
    // axios request to server..
    axios.post('/api/parkReview', userReviewObj)
    .then(function(res) {
      axios.get('/api/parkComment/' + context.props.parkId)
      .then(function(response) {
        console.log('should be park comments', response)
        // call function to set state at snp page for comments
        context.props.getCommentsAfterPost(response.data.reverse())
      })
    });

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
