import React from 'react';
import { Button } from 'semantic-ui-react';
import axios from 'axios';

class Like extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: 0,
      userLiked: false
    }
  }

  componentWillMount() {
    var context = this;
    axios.get('/api/photoLike', {
      params: {
        postId: context.props.postId,
        // ** TODO: Get userID from session **
        userId: 321

      }
    })
    .then(function(res) {
      console.log('res from mount', res.data)
      context.setState({
        likes: res.data.voteCount,
        userLiked: res.data.userLiked
      })
    })
  }

  onLike () {
    var context = this;
    var like = {
      // ** TODO: Get userID from session **
      userId: 321,
      postId: context.props.postId
    }
    // send a post request with user/postID
    axios.post('/api/photoLike', like).then(function(res) {
      console.log('vote count', res.data.voteCount);
      context.setState({
        likes: res.data.voteCount,
        userLiked: !context.state.userLiked
      });
    })
      // query the db to check if userID/postID exists in Vote table (find)
      // if res exists,
        // do nothing because they've already liked it
      // else,
        // create a row in that table
        // get vote count in posts, increment by 1

  }

  render () {
    var styles = {};
    if (this.state.userLiked) {
      styles = {
        color: 'red',
        content: 'Liked',
      }
    } else {
      styles = {
        color: 'instagram',
        content: 'Like'
      }
    }

    return (
      <div className='likeContainer' onClick={this.onLike.bind(this)}>
        <Button
          color={styles.color}
          content= {styles.content}
          icon='heart'
          label={
            {
              basic: true,
              color: styles.color,
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
