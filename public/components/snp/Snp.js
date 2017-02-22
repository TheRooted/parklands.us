import React from 'react';
import axios from 'axios';
import Parkphoto from './Parkphoto.js'

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

    }
  }

  componentWillMount() {
    var context = this;
    console.log(context.props.params.parkName);
    axios.get('/api/park/' + context.props.params.parkName).then(function(res) {
      console.log(res);
      if (res.data) {
        console.log('Snp parks:', res.data);
        context.setState({park: res.data})
      }
    }).then(function(){
      if (context.state.park.id) {
        axios.get('/api/parkPhoto/' + context.state.park.id).then(function(res) {
          console.log(res);
          if (res.data) {
            console.log('Snp parkPhotos', res.data);
            context.setState({photos: res.data});
          }
        })
      }
    })
  }

  capFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {
    var context = this;
    if (this.state.view === 'Photos') {
      var mediaView = function () {
        return (context.state.photos.map(photo =>
          <Parkphoto photo={photo.photoUrl}/>))
      }
    }
    return (
      <div>
        <h1>{this.capFirstLetter(this.state.park.name)}</h1>
        <h5>Info</h5>
        <p>{this.state.park.info}</p>
        <button>Photos</button>
        <button>Reviews</button>
        <button>Events</button>
        {mediaView()}
      </div>
    )
  }
}