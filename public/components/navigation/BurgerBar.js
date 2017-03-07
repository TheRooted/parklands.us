import React from 'react';
import Sidebar from './Sidebar.js';

class BurgerBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {sidebarOpen: false};
  }

  //check if the sidebar is opened
  toggleSidebar() {
    console.log('toggling')
    this.setState({sidebarOpen: !this.state.sidebarOpen})
  }

  componentWillUpdate(nextProps, nextState) {
    var context = this;
    // when the menu becomes visible, setup some handlers so we can close the menu easily
    if (nextState.sidebarOpen == true) {
      document.addEventListener('keydown', this.handleKeyPress.bind(context));
      document.querySelector('.app-children').addEventListener('click', this.handleClick.bind(context));
    } else {
      document.removeEventListener('keydown', this.handleKeyPress.bind(context));
      document.querySelector('.app-children').removeEventListener('click', this.handleClick.bind(context));
    }
  }

  handleClick() {
    console.log('handle click')
    if (this.state.sidebarOpen) {
      // this.setState({ sidebarOpen: false });
      this.toggleSidebar();
    }
  }

  handleKeyPress(e) {
    console.log('handle keypress')
    if(e.keyCode === 13 && this.state.sidebarOpen) {
      // this.setState({ sidebarOpen: false })
      this.toggleSidebar();
    }
  }

  render() {
    return (
      <div className='burger'>
        <Sidebar isOpen={this.state.sidebarOpen} toggleSidebar={this.toggleSidebar.bind(this)}/>
      </div>
    )
  }
}

export default BurgerBar;



