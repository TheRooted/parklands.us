import React from 'react';
import axios from 'axios';
import sort from './../sort.js';



class ReviewCommentBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userReview: '',
      clickedPost: false,
      canUserPost: false,
    }
  }

  postReview () {
    var context = this;
    this.setState({clickedPost: true})
    // grab the data from input form
    var userReviewObj = {
      userReview: context.state.userReview,
      userId: context.props.userId,
      parkId: context.props.parkId,
      userEmail: context.props.userEmail,
      firstName: context.props.firstName
    }
    // axios request to server..
    if (context.props.didUserRate) {
      context.setState({canUserPost: true})
      context.refs.reviewBox.value='';
      axios.post('/api/parkReview', userReviewObj)
      .then(function(res) {
        axios.get('/api/parkComment/' + context.props.parkId)
        .then(function(response) {
          var sorted = sort(response.data, 'created');
          // call function to set state at snp page for comments
          context.props.getCommentsAfterPost(sorted[0])
        })
      });
    } else {
      context.setState({canUserPost: false})
    }

  };

  handleChange (event) {
    this.setState({userReview: event.target.value})
  }

render () {
  return (
    <div className='review-comment-box-child'>
      <textarea className="textarea-review" ref='reviewBox' placeholder="Share your experience here..." rows="7" cols="50"
        onChange={this.handleChange.bind(this)} >
      </textarea>
      <br />
      <button className="btn-review" onClick={this.postReview.bind(this)}>Post</button>
      <br />
      {this.state.clickedPost &&
        <div>{this.state.canUserPost ? 'Thanks for sharing!' : 'We need you to rate this park before submitting your review!' }</div>
      }
    </div>
  )}
}


export default ReviewCommentBox;
