import React from 'react';

var capFirstLetter = function (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

var GridElement = (props) => {
  var name = capFirstLetter(props.parkName)
  return (
    <div className='gridElement'>
      <h5>{name}</h5>
      <img src={props.parkPhoto} 
        onClick={() => (props.linkToPage(props.parkName))}
      />
      <h5>{props.parkRating}</h5>
      {/*Rating currently represented as a number, and unable to rate*/}
    </div>
  )

}


module.exports = GridElement;
