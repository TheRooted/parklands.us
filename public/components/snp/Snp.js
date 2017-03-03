import React from 'react';
import axios from 'axios';
import ParkPhotoPost from './ParkPhotoPost.js'
import {browserHistory} from 'react-router'
import Parkcomment from './Parkcomment.js'
import ParkPhoto from './ParkPhoto.js'
import ParkMap from './ParkMap.js'
import RatingPark from './Rating.js'
import { Rating } from 'semantic-ui-react';

// import { Timeline } from 'react-twitter-widgets'



export default class Snp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: this.props.params.parkName,
      park: {
        id: false,
        name: 'null',
        info: 'null',
        twitterHandle: 'undefined'
      },
      view: 'Photos',
      photos: [],
      comments: [],
      // alerts: [],
      officialPhotos: [],
      photoIndex: 0,
      averageRating: 0
    }

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
    //Wrangell-St. Elias code:
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
    //Get the park  object and set state to the new object
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
      } // then get parkPhotos, posts, and comments
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
            let userPhotos = [];
            for (var i = 0; i < res.data.length; i++) {
              userPhotos.push(res.data[i].filePath);
            }
            context.setState({photos: userPhotos});
          }
        })
        axios.get('/api/parkComment/' + context.state.park.id).then(function(res) {
          if (res.data) {
            context.setState({comments: res.data})
          }
        })
        axios.get('/api/parkAverageRating/' + context.state.park.id).then(function(res){
          context.setState({averageRating: res.data.rating})
        })
      } else { //if data comes back without an id it's not a valid park name
        browserHistory.replace('/notavalidpark/' + parkName);
      }
    })
  }

  updateAverageRating (avgRate) {
    this.setState({averageRating: avgRate}, function(done) {
      console.log('snp page avgr', this.state.averageRating)
    });

  }

  render() {
    var context = this;
    if (this.state.view === 'Photos') {
      var mediaView = function () {
        return (
          <div className='photos-view-container'>
            {context.state.photos.map((photo, i) =>
              <ParkPhotoPost photo={photo}
                key={i}
                index={i}
                parkName={context.capFirstLetter(context.state.park.name)}
                photoIndex={context.state.photoIndex}
                userPhotos={context.state.photos}
              />)
            }
          </div>
        )
      }
    } else if (this.state.view === 'Reviews') {
      var mediaView = function () {
        return (
          <div className='review-view-container'>
            <div className='review-header'>
              <h1>{context.capFirstLetter(context.state.park.name) + ' National Park'}</h1>
              <Rating
                icon={'star'}
                maxRating={5}
                rating={context.state.averageRating}
                size= {'huge'}
                disabled={true}
                />
            </div>
            {context.state.comments.map(comment =>
              <Parkcomment userEmail={comment.userEmail} text={comment.text} key={key++}/>)
            }
          </div>
        )
      }
    }

    return (
      <div className='snp'>
        <div className='hero'>
          <img className='hero-photo' src='https://coolworks-bucket001.s3.amazonaws.com/production/pages/heros/209/content/HERO_Yosemite_Half_Dome.jpg?1480224700' />
          <div className='park-title-box'>
            <h2 className="park-title">{this.capFirstLetter(this.state.park.name)} National Park</h2>
            <div className="park-rating">
              <RatingPark parkId={this.state.park.id}
                updateAverageRating={this.updateAverageRating.bind(this)}
              />
            </div>
          </div>

        </div>
        <ParkMap park={this.state.park} />
        <section className="park-info">{this.state.park.info}</section>
        <hr/>
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
      </div>
    )
  }
}
