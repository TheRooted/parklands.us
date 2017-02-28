import React from 'react';
import axios from 'axios';
import ParkPhotoPost from './ParkPhotoPost.js'
import {browserHistory} from 'react-router'
import Parkcomment from './Parkcomment.js'
import ParkPhoto from './ParkPhoto.js'
import ParkMap from './ParkMap.js'
import { Timeline } from 'react-twitter-widgets'



export default class Snp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: this.props.params.parkName,
      park: {
        id: false,
        name: 'null',
        info: 'null',
        twitterHandle: 'jackie'
      },
      view: 'Photos',
      photos: [],
      comments: [],
      // alerts: [],
      officialPhotos: [],
      photoIndex: 0
    }

  }

  componentWillMount() {
    this.setState({count: 0});
  }

  componentWillReceiveProps(nextProps) {
    this.updateParkInfo(nextProps.params.parkName);
  }

  componentWillMount() {
    this.updateParkInfo(this.props.params.parkName);
  }

  capFirstLetter(string) {
    string = string.split(' ');
    string.forEach(function(word, index, array) {
      if (word !== 'of' && word !== 'the' && word !== 'and') {
        array[index] = word.charAt(0).toUpperCase() + word.slice(1);
      }
    })
    string = string.join(' ');
    string = string.split('–');
    string.forEach(function(word, index, array) {
      if (word !== 'of' && word !== 'the' && word !== 'and') {
        array[index] = word.charAt(0).toUpperCase() + word.slice(1);
      }
    });
    string = string.join('–');
    return string;
  }

  changeViewToPhotos() {
    this.setState({view: 'Photos'})
  }

  changeViewToReviews() {
    this.setState({view: 'Reviews'})
  }

  // changeViewToAlerts() {
  //   this.setState({view: 'Alerts'})
  // }

  updateParkInfo(parkName) {
    var context = this;
    parkName = parkName.split(' ');
    parkName = parkName.join('%20');
    axios.get('/api/park/' + parkName).then(function(res) {
      if (res.data) {
        context.setState({park: res.data})
      } else {
        context.setState({park: {
          id: false,
          name: 'blue',
          info: 'not a park!',
          twitterHandle: 'notvalidtwitterHandle'
        }})
      }
    }).then(function(){
      if (context.state.park.id) {
        axios.get('/api/parkPhoto/' + context.state.park.id).then(function(res) {
          if (res.data) {
            let photoUrls = [];
            for (var i = 0; i < res.data.length; i++) {
              photoUrls.push(res.data[i].photoUrl);
            }
            context.setState({officialPhotos: photoUrls});
          }
        })
        axios.get('/api/parkPhotoPost/' + context.state.park.id).then(function(res) {
          if (res.data) {
            context.setState({photos: res.data});
          }
        })
        axios.get('/api/parkComment/' + context.state.park.id).then(function(res) {
          if (res.data) {
            context.setState({comments: res.data})
          }
        })
        // axios.get('/api/parkAlert/' + context.state.park.id).then(function(res) {
        //   if (res.data) {
        //     console.log('alerts', res.data);
        //   }
        // })
      } else {
        browserHistory.push('/notavalidpark/' + parkName);
      }
    })
  }

  movePrevLightbox () {
    this.setState({
      photoIndex: (this.state.photoIndex + this.state.officialPhotos.length - 1) % this.state.officialPhotos.length
    })
  }

  moveNextLightbox() {
    this.setState({
      photoIndex: (this.state.photoIndex + 1) % this.state.officialPhotos.length
    })
  }

  render() {
    var context = this;
    if (this.state.view === 'Photos') {
      var key = 0;
      var mediaView = function () {
        return (context.state.photos.map(photo =>
          <ParkPhotoPost photo={photo.filePath} key={key++}/>))
      }
    } else if (this.state.view === 'Reviews') {
      var key = 0;
      var mediaView = function () {
        return (context.state.comments.map(comment =>
          <Parkcomment userEmail={comment.userEmail} text={comment.text} key={key++}/>))
      }
    }

    return (
      <div className='snp'>
        <h2 className="park-title">{this.capFirstLetter(this.state.park.name)} National Park</h2>
        <ParkMap park={this.state.park} />
        <section className="park-info">{this.state.park.info}</section>
        <hr/>
      {/* if this doesn't work, remove the div wrapper */}
        <div className="official-photo-container">
          {this.state.officialPhotos.map((photo, i) =>
            <ParkPhoto photo={photo}
              key={i}
              index={i}
              parkName={this.capFirstLetter(this.state.park.name)}
              photoIndex={this.state.photoIndex}
              allPhotos={this.state.officialPhotos} />
          )}
        </div>
        <hr/>
        <div className="snp-navlinks">
          <button className="photo-link" onClick={this.changeViewToPhotos.bind(this)}>Photos</button>
          <span className="vertical-bar">|</span>
          <button className="review-link" onClick={this.changeViewToReviews.bind(this)}>Reviews</button>
          {/*<button onClick={this.changeViewToAlerts.bind(this)}>Alerts</button>*/}
        </div>
        <div className="mediaview-container">
          {mediaView()}
        </div>
        <div className="buffer-div"></div>
      </div>
    )
  }
}
