import React from 'react';

const Post = (props) => {

  return (
    <div id="userTimeLineContainer">
      <div id="timeLineFeedContainer">

        <h3>{props.datePosted}</h3>
        <img src={props.photoData} />
      </div>
    </div>
  );
};

export default Post;