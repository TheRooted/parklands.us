import React from 'react';
import axios from 'axios';

var Parkcomment = (props) => (
<<<<<<< HEAD
  <div className= 'parkcommentContainer'>
=======
  <div className='parkcommentcontainer'>
>>>>>>> move signin signup to authPages dir
    <p className='parkcommentusername'>{props.userEmail} says: </p>
    <p className='parkcomment'>{props.text}</p>
  </div>
);


export default Parkcomment;