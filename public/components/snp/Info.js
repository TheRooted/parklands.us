import React from 'react';

const Info = (props) => {
  var detailsArr;
  return (
    <div className='singleInfoContainer'>
      <h2>{props.title}</h2>
      <hr></hr>
      {
        props.detail.split('lb').map((line, i) =>
          <div>{line}</div>
      )}


    </div>
  )
}

export default Info;
