import React from 'react';


const SearchBar = (props) => (
  <div id="wrap">
    <form action="">
      <datalist id='parks'>
        <option value='Yosemite'></option>
        <option value='Yellowstone'></option>
        <option value='Denali'></option>
      </datalist>
      <input id="search" type="text" placeholder="Find your park here..." list='parks' onChange={props.getQuery}></input>
      <input id="search_submit" value="Rechercher" type="submit" onClick={props.handleSubmit}></input>
    </form>
  </div>
)

export default SearchBar;
