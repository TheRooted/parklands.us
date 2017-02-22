import React from 'react';
import axios from 'axios';
import Parkphoto from './Parkphoto.js'
import Parkcomment from './Parkcomment.js'

export default class Snp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      park: {
        id: false,
        name: 'null',
        info: 'null',
      },
      view: 'Photos',
      photos: [],
      comments: [],
    }

  }

  componentWillMount() {
    var context = this;

    axios.get('/api/park/' + context.props.params.parkName).then(function(res) {
      if (res.data) {
        context.setState({park: res.data})
      }
    }).then(function(){
      if (context.state.park.id) {
        axios.get('/api/parkPhoto/' + context.state.park.id).then(function(res) {
          if (res.data) {
            context.setState({photos: res.data});
          }
        })
        axios.get('/api/parkComment/' + context.state.park.id).then(function(res) {
          if (res.data) {
            console.log('comments: ', res.data);
            context.setState({comments: res.data})
          }
        })
      }
    })
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

  changeViewToAlerts() {
    this.setState({view: 'Alerts'})
  }

  render() {
    var context = this;
    if (this.state.view === 'Photos') {
      var key = 0;
      var mediaView = function () {
        return (context.state.photos.map(photo =>
          <Parkphoto photo={photo.filePath} key={key++}/>))
      }
    } else if (this.state.view === 'Reviews') {
      var key = 0;
      var mediaView = function () {
        return (context.state.comments.map(comment =>
          <Parkcomment userEmail={comment.userEmail} text={comment.text} key={key++}/>))
      }
    } else if (this.state.view === 'Alerts') {

    }
    return (
      <div>
        <h1>{this.capFirstLetter(this.state.park.name)}</h1>
        <h5>Info</h5>
        <p>{this.state.park.info}</p>
        <button onClick={this.changeViewToPhotos.bind(this)}>Photos</button>
        <button onClick={this.changeViewToReviews.bind(this)}>Reviews</button>
        <button onClick={this.changeViewToAlerts.bind(this)}>Alerts</button>
        {mediaView()}
      </div>
    )
  }
}