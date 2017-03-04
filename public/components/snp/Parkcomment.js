import React from 'react';
import axios from 'axios';
import moment from 'moment';

var Parkcomment = (props) => (
  <div className= 'parkcommentContainer'>
    <h4 className='parkcommentusername'>{props.firstName}</h4>
    <span className='parkcomment'>{props.text}</span>
    <small>{moment.utc(props.datePosted).fromNow()}</small>
  </div>
);


export default Parkcomment;
