import React from 'react';

class BurgerBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {burger: true};
  }

  burgerBarOpen() {

  }


  render() {
    return (
      <div>
        <img src='https://cdn1.iconfinder.com/data/icons/android-user-interface-vol-1/16/38_-_menu_bar_lines_option_list_hamburger_web-512.png'/>
      </div>
    )
  }
}

export default BurgerBar;

