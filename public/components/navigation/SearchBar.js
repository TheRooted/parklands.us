import React from 'react';

const SearchBar = (props) => (
	<div id="wrap">
	  <form action="">
	   <input id="search" name="search" type="text" placeholder="Find your park here..."></input>
	   <input id="search_submit" value="Rechercher" type="submit"></input>
	  </form>
	</div>
)

export default SearchBar;

