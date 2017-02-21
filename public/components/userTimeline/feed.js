import React from 'react';

const Feed = (props) => {

  return (
    <div id="timeLineFeedContainer">
      <h3>{props.datePosted}</h3>
      <img src="{props.imageUrl}" />
    </div>
  );
};

export default Feed;