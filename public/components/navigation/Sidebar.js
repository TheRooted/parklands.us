import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import { browserHistory } from 'react-router';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  sidebarAddClass() {
    var sidebarClass = this.props.isOpen ? 'sidebar open' : 'sidebar';
    return sidebarClass;
  }

  handleSubmit() {
    axios.post('/signout').then(function(res) {
      if (res.status === 200) {
        browserHistory.push('/signin');
      } else if (res.status === 400) {
        console.log('Bad signout!');
      }
    });
  }

  render() {
    return (
      <div className="sidebarContainer">
        <img src='https://www.newfangled.com/wp-content/uploads/2014/08/stuffcontentmgrfiles2ac67e44c30a21635f8a9d498f832bc1cmisc_resized80_313_257_hamenu.png' 
          className="burger-button" onClick={this.props.toggleSidebar} />
        <div className={this.sidebarAddClass()}>
          <div className="sidebar-links">
            <div className="sidebar-content">
              <Link to="/" className="maplink">Mapview</Link>
            </div>
            <div className="sidebar-content">
              <Link to="userfeed" className="userfeedlink">Trending</Link>
            </div>
            <div className="sidebar-content">
              <Link to="usertimeline" className="profilelink">Profile</Link>
            </div>
            <div className="sidebar-content">
              <Link className="donatelink">Donate</Link>
            </div>
            <div className="sidebar-content">
              <Link to="signout" className="signoutlink" onClick={this.handleSubmit.bind(this)}>Sign Out</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Sidebar;

