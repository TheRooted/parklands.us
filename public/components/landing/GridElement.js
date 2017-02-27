import React from 'react';

var capFirstLetter = function (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

var GridElement = (props) => {
  var words = props.parkName.split(' ');
  for (var i = 0; i < words.length; i++) {
    if (words[i] === 'wrangell–st.') {
      words[i] = words[i].split('–');
      console.log(words[i]);
      words[i].forEach(function(word, index, array) {
        array[index] = capFirstLetter(word);
        console.log(array[index]);
      });
      console.log(words[i]);
      words[i] = words[i].join('-');
      console.log(words[i]);
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
    </div>
  )

}


module.exports = GridElement;
