import React from 'react';
import { Link } from 'react-router';

const Sidebar = React.createClass({
  render: function() {
    let sidebarClass = this.props.isOpen ? 'sidebar open' : 'sidebar';
    return (
      <div>
        <img src='https://www.newfangled.com/wp-content/uploads/2014/08/stuffcontentmgrfiles2ac67e44c30a21635f8a9d498f832bc1cmisc_resized80_313_257_hamenu.png' 
          onClick={this.props.toggleSidebar} className="burger-button" />
        <div className={sidebarClass}>
          <div className="sidebarContent">Username_here</div>
          <Link to='userTimeline' className="sidebarContent">Timeline</Link>
          <div className="sidebarContent">Feed</div>
          <div className="sidebarContent">Donate</div>
          <div className="sidebarContent">Logout</div>
        </div>
      </div>
    );
  }
});

// <img src='https://www.newfangled.com/wp-content/uploads/2014/08/stuffcontentmgrfiles2ac67e44c30a21635f8a9d498f832bc1cmisc_resized80_313_257_hamenu.png' className='burger' width='22' height='22'
//   onClick={this.props.toggleSidebar}

export default Sidebar;

