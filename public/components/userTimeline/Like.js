import React from 'react';
import { Button } from 'semantic-ui-react';
import axios from 'axios';

class Like extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: 0,
      userLiked: false,
      styles: {
        color: 'instagram',
        content: 'Like'
      }
    };
  }

  componentWillMount() {
    var context = this;
    axios.get('/api/photoLike', {
      params: {
        postId: context.props.postId,
        userId: context.props.userId
      }
    })
    .then(function(res) {
      context.setState({
        likes: res.data.voteCount,
        userLiked: res.data.userLiked,
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    var context = this;
    if (context.props.parkId !== nextProps.parkId) {
      axios.get('/api/photoLike', {
        params: {
          postId: nextProps.postId,
          userId: nextProps.userId
        }
      })
      .then(function(res) {
        context.setState({
          likes: res.data.voteCount,
          userLiked: res.data.userLiked
        });
      });
   }
  }


  onLike () {
    var context = this;
    var like = {
      userId: context.props.userId,
      postId: context.props.postId
    };
    // send a post request with user/postID
    axios.post('/api/photoLike', like).then(function(res) {
      context.setState({
        likes: res.data.voteCount,
        userLiked: !context.state.userLiked
      });
    });
      // query the db to check if userID/postID exists in Vote table (find)
      // if res exists,
        // do nothing because they've already liked it
      // else,
        // create a row in that table
        // get vote count in posts, increment by 1

  }

  render () {
    // console.log('am i render or am i dancer', this.state.userLiked)
    var styles = {};
    if (this.state.userLiked) {
      styles = {
        color: 'red',
        content: 'Liked',
      };
    } else {
      styles = {
        color: 'instagram',
        content: 'Like'
      };
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
