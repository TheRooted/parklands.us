import React from 'react';
import axios from 'axios';
import { Button } from 'semantic-ui-react';
import Lightbox from 'react-image-lightbox';
import Like from './../userTimeline/Like.js';
import PostComments from './../userFeed/PostComments.js';
import PhotoCommentBox from './PhotoCommentBox.js';
import sort from './../sort.js';
import loadMore from './../loadMore.js';

class ParkPhotoPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isCommentBoxOpen: false,
      photoIndex: this.props.index,
      userPhotos: this.props.userPhotos,
      parkId: this.props.parkId,
      postId: this.props.postId,
      userEmail: '',
      postComments: [],
      originalIndex: this.props.index,
      description: this.props.description,
    }
  }

  componentWillMount() {
    var context = this;
    // get post comments for particular posts
    axios.get('/api/postcomment', {
      params: {postId: context.state.postId}
    }).then(function(res) {
      // sort the res.data chronologically
      var sortedComments = sort(res.data, 'created');
      context.setState({postComments: sortedComments});

      axios.get('/api/userNameFromPostId', {
        params: {
          postId: context.state.postId
        }
      }).then(function (res) {
        context.setState({
          userEmail: res.data.firstName,
        })
      })
    })
  }

  componentWillReceiveProps(nextProps) {
    var context = this;
    if (this.state.parkId !== nextProps.parkId) {
      this.setState({
        userPhotos: nextProps.userPhotos,
        photoIndex: nextProps.index,
        postId: nextProps.postId,
        parkId: nextProps.parkId,
        originalIndex: nextProps.index,
        description: nextProps.description,
      }, function () {
        axios.get('/api/postcomment', {
          params: {postId: context.state.postId}
        }).then(function(res) {
          // sort the res.data chronologically
          var sortedComments = sort(res.data, 'created');
          context.setState({postComments: sortedComments});
        })
        axios.get('/api/userNameFromPostId', {
          params: {
            postId: context.state.postId
          }
        }).then(function (res) {
          context.setState({
            userEmail: res.data.firstName,
          })
        })
      })
    }
  }

  setNewComments (comments) {
    this.setState({postComments: comments});
  }

  toggleCommentBox () {
    this.setState({isCommentBoxOpen: !this.state.isCommentBoxOpen})
  }

  openLightbox () {
    this.setState({isOpen: true})
  }

  closeLightbox () {
    this.setState({isOpen: false, photoIndex: this.state.originalIndex})
  }

  render () {
    return (
      <div className='parkPhotoContainer'>
        <h5>{this.state.userEmail} shared: </h5>
        <img className='parkphotopost' src={this.props.photo} onClick={this.openLightbox.bind(this)} />
        <div className='like-comment-snp-container'>
          <div className='snp-like-comment'>
            <Like postId={this.state.postId} parkId={this.state.parkId} userId={this.props.userId}/>
            <span onClick={this.toggleCommentBox.bind(this)}>
              <Button
                icon={'comment outline'}
                basic color={'green'}
                circular={true}
               />
           </span>
          </div>
          <div>
            {this.state.isCommentBoxOpen &&
              <PhotoCommentBox
                userId={this.props.userId}
                postId={this.state.postId}
                setNewComments={this.setNewComments.bind(this)}
              />
            }
          </div>
          <div className='post-comment-scroll'>
            <PostComments parkId={this.state.parkId} postId={this.state.postId} allComments={this.state.postComments} commentStyle={'snp-comment-box'} />
          </div>
      </div>


          {this.state.isOpen &&
            <Lightbox
              mainSrc={this.state.userPhotos[this.state.photoIndex].filePath}
              imageCaption={this.state.description}
              onCloseRequest={this.closeLightbox.bind(this)}
              nextSrc={this.state.userPhotos[(this.state.photoIndex + 1) % this.state.userPhotos.length].filePath}
              prevSrc={this.state.userPhotos[(this.state.photoIndex + this.state.userPhotos.length - 1) % this.state.userPhotos.length].filePath}
              onMovePrevRequest={() => this.setState({
                  photoIndex: (this.state.photoIndex + this.state.userPhotos.length - 1) % this.state.userPhotos.length,
                  description: this.state.userPhotos[(this.state.photoIndex + this.state.userPhotos.length - 1) % this.state.userPhotos.length].description
              })}
              onMoveNextRequest={() => this.setState({
                  photoIndex: (this.state.photoIndex + 1) % this.state.userPhotos.length,
                  description: this.state.userPhotos[(this.state.photoIndex + 1) % this.state.userPhotos.length].description
              })}
            />
          }
      </div>
    )
  }

};



export default ParkPhotoPost;
