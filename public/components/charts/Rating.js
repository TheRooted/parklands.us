import React, { Component } from 'react';
import { VictoryPie } from 'victory';

export default class PieChart extends Component {
  render() {
    return (
      <VictoryPie />
    );
  }
}

//render(<PieChart />, document.getElementById('app'));


//module.exports = RatingChart;
