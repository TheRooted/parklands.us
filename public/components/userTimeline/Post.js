import React from 'react';
import Like from './Like.js';
import PostComment from './../userFeed/PostComments.js';
import axios from 'axios';
import sort from './../sort.js';
import moment from 'moment';
import Lightbox from 'react-image-lightbox';


export default class Post extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      like: 0,
      image: null,
      allComments: [],
      parkId: 'notvalid',
      userId: this.props.userId,
      description: this.props.description,
      photoData: this.props.photoData,
      allPosts: this.props.allPosts,
      photoIndex: this.props.index,
      originalIndex: this.props.index,
      isOpen: false,
      view: this.props.view,
      parkName: null,
      emptyComment: ''
    };
  }

  componentWillMount() {
    const context = this;

    axios.get('/api/postcomment', {
      params: {
        postId: context.props.postId
      }
    })
    .then(function (res) {
      var sortedRes = sort(res.data, 'activity');
      context.setState({
        allComments: sortedRes
      });
    });

    axios.get('/api/parkNameFromParkId', {params:
      {
        parkId: context.props.parkId
      }
    }).then(function(res) {
      var name = context.capFirstLetter(res.data.parkName) + ' National Park';
      context.setState({parkName: name});
    })
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

  componentWillReceiveProps(nextProps) {
    this.setState({
      allPosts: nextProps.allPosts
    })
  }

  convertDate(date) {
    var converted = new Date(date).toString();
    return converted.slice(4, 10) + ', ' + converted.slice(11, 16);
  }

  _handleInputChange(event) {
    this.setState({comment: event.target.value});
    if(event.target.value) {
      this.setState({
        emptyComment: ''
      });
    }
  }


  _addComment () {
    var context = this;

    if(this.state.comment) {
      axios.post('/api/postcomment', {
        userId: context.state.userId,
        postId: context.props.postId,
        text: context.state.comment
      })
      .then(function (res) {

        var allComment = [res.data].concat(context.state.allComments);

        context.setState({
          allComments: allComment,
          comment: '',
          emptyComment: ''
        });
      });
    } else {
      if(this.state.comment) {
        this.setState({
          emptyComment: ''
        });
      } else {
        this.setState({
          emptyComment: "Please enter a comment"
        });
      }
    }
  }

  openLightbox () {
    this.setState({isOpen: true})
  }

  closeLightbox () {
    this.setState({isOpen: false, photoIndex: this.state.originalIndex})
  }

  render () {
    return (
      <div className={(this.state.view === 'trending-view') ? 'post-container-trending' : 'post-container'}>
        <div className='postDescription'>
          <strong>{(this.state.view === 'profile-view') ? this.state.parkName  : this.props.firstName + ' shared:'}</strong>
          <p className="postDate">{moment(this.props.datePosted).format('MMMM Do YYYY')}</p>
        </div>
        <div className={(this.state.view === 'trending-view') ? 'photo-container-trending' : 'photo-container'}>
          <img className={(this.state.view === 'trending-view') ? 'timelinePhotoFeedTrending' : 'timelinePhotoFeed'} src={this.props.photoData} onClick={this.openLightbox.bind(this)} />
        </div>
        <div className={(this.state.view === 'trending-view') ? 'commentlineTrending' : 'commentline'}>
          <Like className="likeTimeline" postId={this.props.postId} parkId={this.state.parkId} userId={this.state.userId}/>
          <textarea
            className={(this.state.view === 'trending-view') ? 'commentTimelineTrending' : 'commentTimeline'}
            value={this.state.comment}
            onChange={this._handleInputChange.bind(this)}>
          </textarea>
          <button
            className="submitButton"
            onClick={this._addComment.bind(this)}
            >Comment</button>
          <div className="emptyComment">{this.state.emptyComment}</div>
        </div>
        <PostComment allComments={this.state.allComments} postId={this.props.postId} view={this.state.view} />

          {this.state.isOpen &&
            <Lightbox
              mainSrc={this.state.allPosts[this.state.photoIndex].filePath}
              imageCaption={this.state.description}
              onCloseRequest={this.closeLightbox.bind(this)}
              nextSrc={this.state.allPosts[(this.state.photoIndex + 1) % this.state.allPosts.length].filePath}
              prevSrc={this.state.allPosts[(this.state.photoIndex + this.state.allPosts.length - 1) % this.state.allPosts.length].filePath}
              onMovePrevRequest={() => this.setState({
                  photoIndex: (this.state.photoIndex + this.state.allPosts.length - 1) % this.state.allPosts.length,
                  description: this.state.allPosts[(this.state.photoIndex + this.state.allPosts.length - 1) % this.state.allPosts.length].description
              })}
              onMoveNextRequest={() => this.setState({
                  photoIndex: (this.state.photoIndex + 1) % this.state.allPosts.length,
                  description: this.state.allPosts[(this.state.photoIndex + 1) % this.state.allPosts.length].description
              })}
            />
          }

      </div>
    );
  }
};
