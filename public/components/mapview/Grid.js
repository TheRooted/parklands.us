import React from 'react';
import axios from 'axios';
import GridElement from './GridElement';
import { browserHistory } from 'react-router';
import sort from './../sort.js';
import { Rating } from 'semantic-ui-react';

export default class Grid extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      parks: [{name: 'Loading', photo: 'http://bikeportal.ro/addons/shared_addons/themes/foundation_6/img/img_thumb_small.png', rating: 0}],
    };
  }

  componentWillMount() {
    var context = this;
    axios.get('/api/grid').then(function(res) {
      if (res.data) {
        res.data = sort(res.data, 'alphabetically');
        context.setState({parks: res.data});
      }
    });
  }

  sortAlphabetical() {
    var arr = sort(this.state.parks, 'alphabetically');
    this.setState({parks: arr});
  }

  sortRated() {
    var arr = sort(this.state.parks, 'rating');
    this.setState({parks: arr});
  }

  linkToPage(parkName) {
    browserHistory.push('/park/' + parkName);
  }

  render () {
    return (
      <div className='grid-container'>
        <div className='grid-underbar'>
        <div className='grid-header'>Explore the Parks</div>
          <button id="grid-alph" className="grid-btn" onClick={this.sortAlphabetical.bind(this)}>Alphabetical</button>
          <span> | </span>
          <button id="grid-pop" className="grid-btn" onClick={this.sortRated.bind(this)}>Highest Rated</button>
        </div>
        <div className='grid'>
          {this.state.parks.map((park, i) =>
            <GridElement key={i} parkName={park.name} parkPhoto={park.photo} parkRating={park.rating} linkToPage={this.linkToPage} />
          )}
        </div>
      </div>
    )
  }
}
