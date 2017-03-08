import React from 'react';

var NotAPark = (props) => (
  <div id='notapark'>
    <div className="invalid-message">Nope. We couldn't find a park called {props.params.parkName}.</div>
    <img src='https://s-media-cache-ak0.pinimg.com/originals/4b/77/17/4b7717ac59e7ed6582f5ae3251b1493e.jpg' />
  </div>
)

export default NotAPark;