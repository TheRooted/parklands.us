import React from 'react';
import Grid from './Grid.js';
import Mapp from '../map.js';

// should render the all components of the landing page
// (big photo, map, grid)

export default class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div id="landing-div">
        <Mapp />
        <Grid />
      </div>
    )
  }
}
