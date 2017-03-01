import React from 'react';
import axios from 'axios';
import { browserHistory, Link } from 'react-router';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  sidebarAddClass() {
    var sidebarClass = this.props.isOpen ? 'sidebar open' : 'sidebar';
    return sidebarClass;
  }

  handleSignout() {
    var user = {
      email: 'frog@email.com',
      password: 'frog'
    }
    axios.post('/signout', user).then(function(res) {
      if (res.request.responseURL === 'http://localhost:3000/signin') {
        browserHistory.push('/signin');
      } else {
        browserHistory.push('/signup');
      }
    });
  }

  render() {
    return (
      <div className="sidebarContainer">
        <img src='http://www.freeiconspng.com/uploads/menu-icon-13.png' 
          className="burger-button" onClick={this.props.toggleSidebar} />
        <div className={this.sidebarAddClass()}>
          <div className="sidebar-links">
            <div className="sidebar-content">
              <Link to="/" className="maplink" onClick={this.props.toggleSidebar}>Mapview</Link>
            </div>
            <div className="sidebar-content">
              <Link to="/userfeed" className="userfeedlink" onClick={this.props.toggleSidebar}>Trending</Link>
            </div>
            <div className="sidebar-content">
              <Link to="/usertimeline" className="profilelink" onClick={this.props.toggleSidebar}>Profile</Link>
            </div>
            <div className="sidebar-content">
              <Link to="/park/yosemite" className="snplink" onClick={this.props.toggleSidebar}>National Park</Link>
            </div>
            <div className="sidebar-content">
              <Link className="signoutlink" onClick={() =>{this.props.toggleSidebar(); this.handleSignout()}}>Sign Out</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Sidebar;
