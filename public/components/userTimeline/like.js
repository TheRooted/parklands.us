import React from 'react';
import { Button } from 'semantic-ui-react';
import axios from 'axios';

class Like extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: 0
    }
  }

  componentWillMount() {
    var context = this;
    axios.get('/api/photoLike', {
      params: {
        postId: context.props.postId
      }
    }
  ).then(function(res) {
    context.setState({likes: res.data.voteCount})
    })
  }
  //component will mount should GET likes from DB and then set
  // this.state.likes to the response

  onLike () {
    var context = this;
    // get user ID, and post ID
    var like = {
      // ** TODO: Get userID from session **
      userId: 321,
      postId: context.props.postId
    }
    // send a post request with user/postID
    axios.post('/api/photoLike', like).then(function(res) {
      console.log('vote count', res.data.voteCount);
      context.setState({likes: res.data.voteCount});
    })
      // query the db to check if userID/postID exists in Vote table (find)
      // if res exists,
        // do nothing because they've already liked it
      // else,
        // create a row in that table
        // get vote count in posts, increment by 1

  }

  render () {
    return (
      <div className='likeContainer' onClick={this.onLike.bind(this)}>
        <Button
          color='red'
          content='Like'
          icon='heart'
          label={
            {
              basic: true,
              color: 'red',
              pointing: 'left',
              content: this.state.likes
            }
          }
          />
      </div>
    )
  }
}


export default Like;
