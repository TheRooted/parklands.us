import React from 'react';
import Grid from './Grid.js';
import Mapp from '../Mapp.js';

// should render the all components of the landing page
// (big photo, map, grid)

export default class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className="landing-div">
        <div className='splash-landing'>
          <img className='splash-img' src='https://www.adventure-journal.com/wp-content/uploads/2015/07/15155461297_402eeb3fd7_h.jpg' />
          <div className='splash-title'>START EXPLORING</div>
        </div>
        <Mapp />
        <Grid />
      </div>
    )
  }
}
