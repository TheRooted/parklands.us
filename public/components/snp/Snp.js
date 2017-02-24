import React from 'react';
import axios from 'axios';
import ParkPhotoPost from './ParkPhotoPost.js'
import {browserHistory} from 'react-router'
import Parkcomment from './Parkcomment.js'
import ParkPhoto from './ParkPhoto.js'
import ParkMap from './ParkMap.js'

export default class Snp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: this.props.params.parkName,
      park: {
        id: false,
        name: 'null',
        info: 'null',
      },
      view: 'Photos',
      photos: [],
      comments: [],
      // alerts: [],
      officialPhotos: []
    }

  }

  componentWillReceiveProps(nextProps) {
    // this.setState({url: nextProps.params.parkName});
    this.updateParkInfo(nextProps.params.parkName);
  }

  componentWillMount() {
    this.updateParkInfo(this.props.params.parkName);
  }

  capFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
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
    axios.get('/api/park/' + parkName).then(function(res) {
      if (res.data) {
        context.setState({park: res.data})
      } else {
        context.setState({park: {
          id: false,
          name: 'blue',
          info: 'not a park!',
        }})
      }
    }).then(function(){
      if (context.state.park.id) {
        axios.get('/api/parkPhoto/' + context.state.park.id).then(function(res) {
          if (res.data) {
            context.setState({officialPhotos: res.data});

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

  render() {
    var context = this;
    // if (this.state.park.name === 'null') {
    //   this.updateParkInfo(this.props.params.parkName);
    // }
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
    // else if (this.state.view === 'Alerts') {
    //   var mediaView = function () {
    //     return(<h1>{context.state.alerts[0]}</h1>)
    //   }
    // }
    return (
      <div className='snp'>
        <h1>{this.capFirstLetter(this.state.park.name)} National Park</h1>
        <ParkMap />
        <p>{this.state.park.info}</p>
        {this.state.officialPhotos.map(photo => 
          <ParkPhoto photo={photo.photoUrl} />
        )} 
        <button onClick={this.changeViewToPhotos.bind(this)}>Photos</button>
        <button onClick={this.changeViewToReviews.bind(this)}>Reviews</button>
        {/*<button onClick={this.changeViewToAlerts.bind(this)}>Alerts</button>*/}
        {mediaView()}
      </div>
    )
  }
}