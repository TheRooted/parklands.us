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
      displayComments: [],
    }
  }

  componentWillMount() {
    var context = this;
    // get post comments for particular posts
    axios.get('/api/postcomment', {
      params: {postId: context.state.postId}
    }).then(function(res) {
      console.log('am i the correct post comments?', res.data)
      // sort the res.data chronologically
      var sortedComments = sort(res.data, 'created');
      var loadResults = loadMore(3, context.state.displayComments, sortedComments);
      var displayArr = loadResults[0];
      var storageArr = loadResults[1];
      console.log('loadResults',loadResults)
      context.setState({displayComments: displayArr, postComments: storageArr});
    })
  }

  componentWillReceiveProps(nextProps) {
    var context = this;
    this.setState({
      userPhotos: nextProps.userPhotos,
      photoIndex: nextProps.index,
      postId: nextProps.postId,
      parkId: nextProps.parkId
    }, function () {
      axios.get('/api/userNameFromPostId', {
        params: {
          postId: this.state.postId
        }
      }).then(function (res) {
        context.setState({
          userEmail: res.data.firstName
        })
      })
    })
  }

  setNewComments (comments) {
    this.setState({postComments: comments})
  }

  toggleCommentBox () {
    console.log('am i toggling')
    this.setState({isCommentBoxOpen: !this.state.isCommentBoxOpen})
  }

  viewAllComments () {
    //view
    console.log('clicking viewall')
  }

  openLightbox () {
    this.setState({isOpen: true})
  }

  closeLightbox () {
    this.setState({isOpen: false})
  }

  render () {
    return (
      <div className='parkPhotoContainer'>
        <h5>{this.state.userEmail} shared: </h5>
        <img className='parkphotopost' src={this.props.photo} onClick={this.openLightbox.bind(this)} />
        <div className='like-comment-snp-container'>
          <div className='snp-like-comment'>
            <Like postId={this.state.postId} parkId={this.state.parkId}/>
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
              /*TODO FIX ME HARD CODED USERID*/
              <PhotoCommentBox
                userId={'106'}
                postId={this.state.postId}
                setNewComments={this.setNewComments.bind(this)}
              />
            }
          </div>
          <div className='load-hide-comments' >
            <p className='show-more-comments' onClick={this.viewAllComments} >View all comments</p>
            <p className='show-less-comments'>Show less</p>
          </div>
          <PostComments postId={this.state.postId} allComments={this.state.displayComments} commentStyle={'snp-comment-box'} />
      </div>


          {this.state.isOpen &&
            <Lightbox
              mainSrc={this.state.userPhotos[this.state.photoIndex].filePath}
              imageCaption={'Fill caption here... '}
              onCloseRequest={this.closeLightbox.bind(this)}
              nextSrc={this.state.userPhotos[(this.state.photoIndex + 1) % this.state.userPhotos.length].filePath}
              prevSrc={this.state.userPhotos[(this.state.photoIndex + this.state.userPhotos.length - 1) % this.state.userPhotos.length].filePath}
              onMovePrevRequest={() => this.setState({
                  photoIndex: (this.state.photoIndex + this.state.userPhotos.length - 1) % this.state.userPhotos.length
              })}
              onMoveNextRequest={() => this.setState({
                  photoIndex: (this.state.photoIndex + 1) % this.state.userPhotos.length
              })}
            />
          }
      </div>
    )
  }

};



export default ParkPhotoPost;
