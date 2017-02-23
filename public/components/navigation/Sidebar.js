import React from 'react';
import { Link } from 'react-router';

const Sidebar = React.createClass({
  render: function() {
    let sidebarClass = this.props.isOpen ? 'sidebar open' : 'sidebar';
    return (
      <div>
        <img src='https://www.newfangled.com/wp-content/uploads/2014/08/stuffcontentmgrfiles2ac67e44c30a21635f8a9d498f832bc1cmisc_resized80_313_257_hamenu.png' 
          onClick={this.props.toggleSidebar} className="sidebar-toggle" />
        <div className={sidebarClass}>
          <div>I slide into view</div>
          <div>Me too!</div>
          <div>Meee Threeeee!</div>
        </div>
      </div>
    );
  }
});

// <img src='https://www.newfangled.com/wp-content/uploads/2014/08/stuffcontentmgrfiles2ac67e44c30a21635f8a9d498f832bc1cmisc_resized80_313_257_hamenu.png' className='burger' width='22' height='22'
//   onClick={this.props.toggleSidebar}

export default Sidebar;

