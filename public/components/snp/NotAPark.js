import React from 'react';

var NotAPark = (props) => (
  <div id='notapark'>
    <span className="invalid-message">Oops! We couldn't find a park called {props.params.parkName}.</span>
    <img src='https://s-media-cache-ak0.pinimg.com/originals/4b/77/17/4b7717ac59e7ed6582f5ae3251b1493e.jpg' />
  </div>
)

export default NotAPark;