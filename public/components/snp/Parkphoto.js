import React from 'react';

var ParkPhoto = (props) => (
  <div>
    <img className='parkphoto' src={props.photo} /> 
  </div>
);

export default ParkPhoto;