import React from 'react';

var GridElement = (props) => (
  <div className='gridElement'>
    <h5>{props.parkName}</h5>
    {/* Need to add gridphoto to database
    <img src={props.park.gridphoto} />*/}
    <h5>{props.parkRating}</h5>
    {/*Rating currently represented as a number, and unable to rate*/}
  </div>
)


module.exports = GridElement;
