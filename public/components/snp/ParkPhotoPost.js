import React from 'react';
import Lightbox from 'react-image-lightbox';
import Like from './../userTimeline/Like.js';
import axios from 'axios';

class ParkPhotoPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      photoIndex: this.props.index,
      userPhotos: this.props.userPhotos,
      parkId: this.props.parkId,
      postId: this.props.postId,
      userEmail: '',
    }
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
        console.log(res);
        context.setState({
          userEmail: res.data.firstName
        })
      })
    })
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
        <div className='snp-like'>
          <Like postId={this.state.postId} parkId={this.state.parkId}/>
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
