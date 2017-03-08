import React from 'react';
import Lightbox from 'react-image-lightbox';


class ParkPhoto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      photoIndex: this.props.index,
      originalIndex: this.props.index,
      allPhotos: []
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({allPhotos: nextProps.allPhotos})
    this.setState({photoIndex: nextProps.index})
  }

  openLightbox () {
    this.setState({isOpen: true, photoIndex: this.state.originalIndex})
  }

  closeLightbox () {
    this.setState({isOpen: false})
  }


  render () {

    return (
      <div className='offical-park-modal' >
        <img className='official-parkphoto' src={this.props.photo} onClick={this.openLightbox.bind(this)} />

        {this.state.isOpen &&
          <Lightbox
            mainSrc={this.state.allPhotos[this.state.photoIndex]}
            imageCaption={this.props.parkName + ' National Park'}
            onCloseRequest={this.closeLightbox.bind(this)}
            nextSrc={this.state.allPhotos[(this.state.photoIndex + 1) % this.state.allPhotos.length]}
            prevSrc={this.state.allPhotos[(this.state.photoIndex + this.state.allPhotos.length - 1) % this.state.allPhotos.length]}
            onMovePrevRequest={() => this.setState({
                photoIndex: (this.state.photoIndex + this.state.allPhotos.length - 1) % this.state.allPhotos.length
            })}
            onMoveNextRequest={() => this.setState({
                photoIndex: (this.state.photoIndex + 1) % this.state.allPhotos.length
            })}
          />
          }
      </div>
    );
  }

}

export default ParkPhoto;
