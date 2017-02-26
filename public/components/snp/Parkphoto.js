import React from 'react';

var ParkPhoto = (props) => (
  <div className='parkPhotoContainer'>
    <img className='official-parkphoto' src={props.photo} /> 
  </div>
);

export default ParkPhoto;