import React from 'react';
import Sidebar from './Sidebar.js';

class BurgerBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {sidebarOpen: false};
  }

  //check if the sidebar is opened
  toggleSidebar() {
    this.setState({sidebarOpen: !this.state.sidebarOpen})
  }


  render() {
    return (
      <div>
        <Sidebar isOpen={this.state.sidebarOpen} toggleSidebar={this.toggleSidebar.bind(this)}/>
      </div>
    )
  }
}

export default BurgerBar;



