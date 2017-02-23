import React from 'react';
import { Link } from 'react-router';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  sidebarAddClass() {
    var sidebarClass = this.props.isOpen ? 'sidebar open' : 'sidebar';
    return sidebarClass;
  }

  render() {
    return (
      <div className='sidebarContainer'>
        <img src='https://www.newfangled.com/wp-content/uploads/2014/08/stuffcontentmgrfiles2ac67e44c30a21635f8a9d498f832bc1cmisc_resized80_313_257_hamenu.png' 
          onClick={this.props.toggleSidebar} className="burger-button" />
        <div className={this.sidebarAddClass()}>
          <div className="sidebarContent">Username_here</div>
          <Link to='userTimeline' className="sidebarContent">Timeline</Link>
          <div className="sidebarContent">Feed</div>
          <div className="sidebarContent">Donate</div>
          <div className="sidebarContent">Logout</div>
        </div>
      </div>
    );
  }
}

export default Sidebar;

