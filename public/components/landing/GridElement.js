import React from 'react';
import { Rating } from 'semantic-ui-react';


var capFirstLetter = function (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

var GridElement = (props) => {

  

  var words = props.parkName.split(' ');
  for (var i = 0; i < words.length; i++) {
    if (words[i] === 'wrangell–st.') {
      words[i] = words[i].split('–');
      words[i].forEach(function(word, index, array) {
        array[index] = capFirstLetter(word);
      });
      words[i] = words[i].join('-');
    } else if (words[i] !== 'of' && words[i] !== 'the' && words[i] !== 'and') {
      words[i] = capFirstLetter(words[i]);
    }
  }
  var name = words.join(' ');
  return (
    <div className='gridElement'>
      <h5>{name}</h5>
      <img src={props.parkPhoto}
        onClick={() => (props.linkToPage(props.parkName))}
      />
    <br />
    <div className='grid-rating'>
      <span>Avg. </span>
      <Rating
        icon={'star'}
        maxRating={5}
        rating={Math.round(props.parkRating)}
        size= {'tiny'}
        disabled={true}
        />
    </div>
    </div>
  )

}


module.exports = GridElement;
