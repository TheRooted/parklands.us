import React from 'react';
import axios from 'axios';
import Post from './Post.js';
import ImageUpload from './ImageUpload.js';
import sort from './../sort.js';
import loadMore from './../loadMore.js';
import Select from 'react-select';

export default class UserTimeline extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      photoCount: 10,
      remainingActivity: [],
      displayedActivity: [],
      displayUpload: 'none',
      selectValue: 'Select...',
      parkId: null,
      parkList: [
        {value: 'acadia', label: 'Acadia'},
        {value: 'american samoa', label: 'American Samoa'},
        {value: 'arches', label: 'Arches'},
        {value: 'badlands', label: 'Badlands'},
        {value: 'big bend', label: 'Big Bend'},
        {value: 'biscayne', label: 'Biscayne'},
        {value: 'black canyon of the gunnison', label: 'Black Canyon of the Gunnison'},
        {value: 'bryce canyon', label: 'Bryce Canyon'},
        {value: 'canyonlands', label: 'Canyonlands'},
        {value: 'capitol reef', label: 'Capitol Reef'},
        {value: 'carlsbad', label: 'Carlsbad Cavern'},
        {value: 'channel islands', label: 'Channel Islands'},
        {value: 'congaree', label: 'Congaree'},
        {value: 'crater lake', label: 'Crater Lake'},
        {value: 'cuyahoga valley', label: 'Cuyahoga Valley'},
        {value: 'death valley', label: 'Death Valley'},
        {value: 'denali', label: 'Denali'},
        {value: 'dry tortugas', label: 'Dry Tortugas'},
        {value: 'everglades', label: 'Everglades'},
        {value: 'gates of the arctic', label: 'Gates of the Arctic'},
        {value: 'glacier', label: 'Glacier'},
        {value: 'glacier bay', label: 'Glacier Bay'},
        {value: 'grand canyon', label: 'Grand Canyon'},
        {value: 'grand teton', label: 'Grand Teton'},
        {value: 'great basin', label: 'Great Basin'},
        {value: 'great sand dunes', label: 'Great Sand Dunes'},
        {value: 'great smoky mountains', label: 'Great Smoky Mountains'},
        {value: 'guadalupe mountains', label: 'Guadalupe Mountains'},
        {value: 'haleakalā', label: 'Haleakalā'},
        {value: 'hawaii volcanoes', label: 'Hawaii Volcanoes'},
        {value: 'hot springs', label: 'Hot Springs'},
        {value: 'isle royale', label: 'Isle Royale'},
        {value: 'joshua tree', label: 'Joshua Tree'},
        {value: 'katmai', label: 'Katmai'},
        {value: 'kenai fjords', label: 'Kenai Fjords'},
        {value: 'kings canyon', label: 'Kings Canyon'},
        {value: 'kobuk valley', label: 'Kobuk Valley'},
        {value: 'lake clark', label: 'Lake Clark'},
        {value: 'lassen volcanic', label: 'Lassen Volcanic'},
        {value: 'mammoth cave', label: 'Mammoth Cave'},
        {value: 'mesa verde', label: 'Mesa Verde'},
        {value: 'mount rainier', label: 'Mount Rainier'},
        {value: 'north cascades', label: 'North Cascades'},
        {value: 'olympic', label: 'Olympic'},
        {value: 'petrified forest', label: 'Petrified Forest'},
        {value: 'pinnacles', label: 'Pinnacles'},
        {value: 'redwood', label: 'Redwood'},
        {value: 'rocky mountains', label: 'Rocky Mountain'},
        {value: 'saguaro', label: 'Saguaro'},
        {value: 'sequoia', label: 'Sequoia'},
        {value: 'shenandoah', label: 'Shenandoah'},
        {value: 'theodore roosevelt', label: 'Theodore Roosevelt'},
        {value: 'virgin islands', label: 'Virgin Islands'},
        {value: 'voyaguers', label: 'Voyageurs'},
        {value: 'wind caves', label: 'Wind Caves'},
        {value: 'wrangell-st. elias', label: 'Wrangell-St. Elias'},
        {value: 'yellowstone', label: 'Yellowstone'},
        {value: 'yosemite', label: 'Yosemite'},
        {value: 'zion', label: 'Zion'}],
    };
  }

  componentWillMount() {
    const context = this;
    axios.get('/api/session').then(function (res) {
      context.setState({
        userId: res.data.id
      })
      axios.get('/api/userTimeline', {
        params: {
          userId: res.data.id
        }
      })
      .then(function (res) {
        var sortedRes = sort(res.data, 'created');
        var newFeed = [];
        for (var i = 0; i < context.state.photoCount; i++) {
          newFeed.push(sortedRes.shift());
        }
        context.setState({
          remainingActivity: sortedRes,
          displayedActivity: newFeed,
        });
      });
    })
  }

  loadMorePhotos() {
    var arrays = loadMore(this.state.photoCount, this.state.displayedActivity, this.state.remainingActivity);
    this.setState({
      displayedActivity: arrays[0],
      remainingActivity: arrays[1],
    });
  }

  addPhoto() {
    const context = this;
    axios.get('/api/userTimeline').then(function (res) {
      var sortedRes = sort(res.data, 'created');
      var newFeed = context.state.displayedActivity.slice();
      var newElement = sortedRes.shift();
      newFeed.unshift(newElement);
      context.setState({
        displayedActivity: newFeed
      })
    })
  }

  selectParkChange(val) {
    if (val === null) {
      this.setState({
        selectValue: 'Select...',
        displayUpload: 'none'
      })
    } else {
      var context = this;
      axios.get('/api/park/' + val.value).then(function(res) {
        if (res.data) {
          context.setState({
            selectValue: val.value,
            displayUpload: 'inline-block',
            parkId: res.data.id
          })
        }
      })
    }
  }

  render() {
    return (
      <div id="userTimeLinePageContainer">
        <span>Select a park to upload a photo to:</span>
        <Select
          className='selectParkImgUpload'
          name="form-field-name"
          value={this.state.selectValue}
          options={this.state.parkList}
          onChange={this.selectParkChange.bind(this)}
        />
        <ImageUpload className="ImageUpload" addPhoto={this.addPhoto.bind(this)} displayUpload={this.state.displayUpload} parkId={this.state.parkId}/>
        {console.log(this.state.displayedActivity)}
        <div className="timeline-post-container">
          {

            this.state.displayedActivity.map((post,i) =>
              <Post
                photoData={post.filePath}
                datePosted={post.createdAt}
                key={post.id}
                postId={post.id}
                allPosts={this.state.displayedActivity}
                description={post.description}
                firstName={post.firstName}
                index={i}
              />
            )
          }
          <button onClick={this.loadMorePhotos.bind(this)}>Load More Photos</button>
        </div>
      </div>
    );
  }
};
