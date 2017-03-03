import React from 'react';
import Lightbox from 'react-image-lightbox';


class ParkPhotoPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      photoIndex: this.props.index,
      userPhotos: []
    }
  }

  componentWillMount() {
    this.setState({userPhotos: this.props.userPhotos})
    this.setState({photoIndex: this.props.index})
  }

  componentWillReceiveProps(nextProps) {
      this.setState({userPhotos: nextProps.userPhotos})
      this.setState({photoIndex: nextProps.index})
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
        <img className='parkphotopost' src={this.props.photo} onClick={this.openLightbox.bind(this)} />

          {this.state.isOpen &&
            <Lightbox
              mainSrc={this.state.userPhotos[this.state.photoIndex]}
              imageCaption={'Fill caption here... '}
              onCloseRequest={this.closeLightbox.bind(this)}
              nextSrc={this.state.userPhotos[(this.state.photoIndex + 1) % this.state.userPhotos.length]}
              prevSrc={this.state.userPhotos[(this.state.photoIndex + this.state.userPhotos.length - 1) % this.state.userPhotos.length]}
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
