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
      parkRating: 0,
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

  linkToPage(parkName) {
    browserHistory.push('/park/' + parkName);
  }

  render () {
    return (
      <div className='grid'>
        {this.state.parks.map((park, i) =>
          <GridElement key={i} parkName={park.name} parkRating={park.rating} parkPhoto={park.photo} linkToPage={this.linkToPage} />
        )}
      </div>
    )
  }
}
