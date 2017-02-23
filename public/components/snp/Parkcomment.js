import React from 'react';
import axios from 'axios';

var Parkcomment = (props) => (
  <div className= 'parkcommentContainer'>
    <p className='parkcommentusername'>{props.userEmail} says: </p>
    <p className='parkcomment'>{props.text}</p>
  </div>
);


export default Parkcomment;