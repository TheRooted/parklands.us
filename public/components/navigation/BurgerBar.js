import React from 'react';
var Menu = require('react-burger-menu').slide;

const BurgerBar = (props) => (
	<div>
    <Menu width={ 200 } right>
      <a id="home" className="menu-item" href="/">Home</a>
      <a id="about" className="menu-item" href="/about">About</a>
      <a id="contact" className="menu-item" href="/contact">Contact</a>
    </Menu> 
  </div>
)

export default BurgerBar;

