import React from 'react';
import axios from 'axios';
var GridElement = require('./GridElement');
import { browserHistory } from 'react-router';
import sort from './../sort.js';
import { Rating } from 'semantic-ui-react';

export default class Grid extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      parks: [{name: 'Blue', rating: 0}],
    };
  }

  componentWillMount() {
    var context = this;
    axios.get('/api/gridParkRating').then(function(res) {
      axios.get('/api/grid').then(function(res) {
        if (res.data) {
          res.data = sort(res.data, 'alphabetically');
          context.setState({parks: res.data});
        }
      });
    })

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
      <div className='grid'>
        <button onClick={this.sortAlphabetical.bind(this)}>Alphabetical</button>
        <button onClick={this.sortRated.bind(this)}>Highest Rated</button>
        {this.state.parks.map((park, i) =>
          <GridElement key={i} parkName={park.name} parkPhoto={park.photo} linkToPage={this.linkToPage} />
        )}
      </div>
    )
  }
}
