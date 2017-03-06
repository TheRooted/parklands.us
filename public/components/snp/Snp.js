import React from 'react';
import axios from 'axios';
import ParkPhotoPost from './ParkPhotoPost.js'
import {browserHistory} from 'react-router'
import Parkcomment from './Parkcomment.js'
import ParkPhoto from './ParkPhoto.js'
import ParkMap from './ParkMap.js'
import RatingPark from './Rating.js'
import { Rating } from 'semantic-ui-react';
import ReviewCommentBox from './ReviewCommentBox.js'
import loadMore from './../loadMore.js';
import sort from './../sort.js';



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
      photosRemaining: [],
      photosDisplay: [],
      commentsRemaining: [],
      commentsDisplay: [],
      // alerts: [],
      officialPhotos: [],
      photoIndex: 0,
      averageRating: 0,
      photoCount: 10,
      didUserRate: false,
      totalReviews: 0
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
            var sortedPhotos = sort(res.data, 'activity');
            var arrays = loadMore(context.state.photoCount, [], sortedPhotos);
            context.setState({
              photosDisplay: arrays[0],
              photosRemaining: arrays[1],
            })
          }
        })
        axios.get('/api/parkComment/' + context.state.park.id).then(function(res) {
          if (res.data) {
            var commentArr = res.data.reverse();
            var sortedComment = sort(res.data, 'activity');
            var arrays = loadMore(context.state.photoCount, [], sortedComment);
            context.setState({
              commentsDisplay: arrays[0],
              commentsRemaining: arrays[1],
            })
          }
        })
        axios.get('/api/totalReviews', {params: {
          parkId: context.state.park.id
        }}).then(function(res) {
          context.setState({totalReviews: res.data.reviews})
        })
        axios.get('/api/parkAverageRating/' + context.state.park.id).then(function(res){
          context.setState({averageRating: Math.round(res.data.rating)})
        })
      } else { //if data comes back without an id it's not a valid park name
        browserHistory.replace('/notavalidpark/' + parkName);
      }
    })
  }

  didUserRate(bool) {
    this.setState({didUserRate: bool});
  }

  updateAverageRating (avgRate) {
    this.setState({averageRating: avgRate});
  }

  getCommentsAfterPost (review) {
    var addNewComment = this.state.commentsDisplay;
    addNewComment.unshift(review)
    this.setState({commentsDisplay: addNewComment});
  }

  loadMorePhotos () {
    var arrays = loadMore(this.state.photoCount, this.state.photosDisplay, this.state.photosRemaining);
    this.setState({
      photosDisplay: arrays[0],
      photosRemaining: arrays[1],
    });
  }

  loadMoreComments () {
    var arrays = loadMore(this.state.photoCount, this.state.commentsDisplay, this.state.commentsRemaining);
    this.setState({
      commentsDisplay: arrays[0],
      commentsRemaining: arrays[1],
    });
  }

  render() {
    var context = this;
    if (this.state.view === 'Photos') {
      var mediaView = function () {
        return (
          <div className='photo-view-container'>
            {context.state.photosDisplay.map((photo, i) =>
              <ParkPhotoPost photo={photo.filePath}
                key={i}
                index={i}
                parkName={context.capFirstLetter(context.state.park.name)}
                photoIndex={context.state.photoIndex}
                userPhotos={context.state.photosDisplay}
                postId={photo.id}
                parkId={photo.parkId}
              />
            )}
            <button onClick={context.loadMorePhotos.bind(context)}>Load More</button>
          </div>
        )
      }
    } else if (this.state.view === 'Reviews') {
      var mediaView = function () {
        return (
          <div className='review-view-container'>
            <div className='review-view-left' >
              <div className='review-header'>
                <div className='review-title'>{context.capFirstLetter(context.state.park.name) + ' National Park'}</div>
                <Rating
                  icon={'star'}
                  maxRating={5}
                  rating={context.state.averageRating}
                  size= {'huge'}
                  disabled={true}
                />
              <span>{context.state.totalReviews} reviews</span>
              <div className='review-section-snp'>
                <h1>Write a review</h1>
                <div className='review-rating-box'>
                  <RatingPark parkId={context.state.park.id}
                    size={'huge'}
                    styleBox={'rating-container-review'}
                    didUserRate={context.didUserRate.bind(context)}
                    updateAverageRating={context.updateAverageRating.bind(context)}
                    />
                  <h3>{context.state.didUserRate ? 'Thanks for rating ' + context.capFirstLetter(context.state.park.name) + ' National Park' : 'Rate your experience'}</h3>
                </div>
                  <div className='reviewCommentBox'>
                    {/*TODO change sessions for userID and get name*/}
                    <ReviewCommentBox
                      didUserRate={context.state.didUserRate}
                      parkId={context.state.park.id}
                      userId={106}
                      firstName={'jackie'}
                      userEmail={'jackieh.bee@gmail.com'}
                      getCommentsAfterPost={context.getCommentsAfterPost.bind(context)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='review-comments'>
              {context.state.commentsDisplay.map((comment, i) =>
                <Parkcomment parkId={comment.parkId} userId={comment.userId} firstName={comment.firstName} text={comment.text} datePosted={comment.createdAt} key={i}/>
              )}
            <button onClick={context.loadMoreComments.bind(context)}>Load More</button>
            </div>
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
                size={'large'}
                didUserRate={this.didUserRate.bind(this)}
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
