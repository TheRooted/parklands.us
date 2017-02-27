import React from 'react';
import axios from 'axios';

var Parkcomment = (props) => (
  <div className= 'parkcommentContainer'>
    <h4 className='parkcommentusername'>{props.userEmail}</h4>
    <p className='parkcomment'>{props.text}</p>
  </div>
);


export default Parkcomment;