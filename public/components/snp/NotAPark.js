import React from 'react';

var NotAPark = (props) => (
  <div id='notapark'>
    <div className="invalid-message">Nope. We couldn't find a park called {props.params.parkName}.</div>
    <img src='https://static.pexels.com/photos/29915/pexels-photo.jpg' />
  </div>
)

export default NotAPark;