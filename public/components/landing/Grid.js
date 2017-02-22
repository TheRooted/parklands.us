import React from 'react';
import axios from 'axios';
var GridElement = require('./GridElement');

export default class Grid extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      parks: [{name: 'Blue', rating: 0}],
    };
  }

  componentWillMount() {
    var context = this;
    axios.get('/api/grid').then(function(res) {
      if (res.data) {
        context.setState({parks: res.data});
      }
    });
  }

  render () {
    var key = 0;
    return (
      <div>
        {this.state.parks.map(park =>
          <GridElement key={key++} parkName={park.name} parkRating={park.rating} />
        )}
      </div>
    )
  }
}
