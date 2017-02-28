import React from 'react';
import ParkOption from './ParkOption.js'

const SearchBar = (props) => (
  <div id="wrap">
    <form className="search-form">
      <datalist id='parks'>
        {props.parkList.map((park, i) =>
          <ParkOption park={park} key={i} />
        )}
      </datalist>
      <input id="search" type="text" autoComplete="off" placeholder="Find your park here..." list='parks' onChange={props.getQuery}></input>
      <input id="search_submit" value="Rechercher" type="submit" onClick={props.handleSubmit}></input>
    </form>
  </div>
)

export default SearchBar;
