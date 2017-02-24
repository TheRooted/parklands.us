import React from 'react';

var ParkPhoto = (props) => (
  <span className='parkPhotoContainer'>
    <img className='parkphoto' src={props.photo} /> 
  </span>
);

export default ParkPhoto;