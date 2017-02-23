import React from 'react';
import Grid from './Grid.js';

// should render the all components of the landing page
// (big photo, map, grid)

export default class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className='landing'>
        <h1> Landing Page </h1>
        <Grid />
      </div>
    )
  }
}
