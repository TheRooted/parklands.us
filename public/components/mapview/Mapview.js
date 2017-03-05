import React from 'react';
import Grid from './Grid.js';
import Mapp from '../Mapp.js';


export default class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className="mapview-div">
        <Mapp />
        <Grid />
      </div>
    )
  }
}