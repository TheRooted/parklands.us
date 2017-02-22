import React from 'react';
import SearchBar from './SearchBar.js';
import BurgerBar from './BurgerBar.js';


const Nav = (props) => (
  <div className='navigation'>
    <SearchBar />
    <span>Parklands</span>
    <BurgerBar />
    
  </div>
)

export default Nav;