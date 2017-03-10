import React from 'react';
import axios from 'axios';
import { Button } from 'semantic-ui-react';
import sort from './../sort.js';

class PhotoCommentBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userComment: ''
    }
  }

  postCommentOnPhoto (event) {
    event.preventDefault();

    var context = this;
    var commentBox = context.refs.commentBox;
    // make sure the user isnt submitting an empty response
    if (this.state.userComment !== '') {
      var userComment = {
        text: context.state.userComment,
        userId: context.props.userId,
        postId: context.props.postId,
      }
      commentBox.value='';

      axios.post('/api/postcomment', userComment).then(function(res){
        axios.get('/api/postcomment', {params: {postId: context.props.postId}}).then(function(res){
          var sortedComments = sort(res.data, 'created');
          context.props.setNewComments(sortedComments)
        });
      });
    }
  }

  handleChange (event) {
    this.setState({userComment: event.target.value})
  }


  render () {
    return (
      <div className='photo-comment-box-child'>
        <textarea className="textarea-photo" ref='commentBox' placeholder=" Add a comment" rows="1" cols="40"
          onChange={this.handleChange.bind(this)} >
        </textarea>
        <div className='write-button'>
          <Button
            basic
            icon={'write'}
            onClick={this.postCommentOnPhoto.bind(this)}
          />
        </div>
      </div>
    )
  }
}

export default PhotoCommentBox;
