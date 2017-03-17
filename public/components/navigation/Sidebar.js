import React from 'react';
import axios from 'axios';
import { browserHistory, Link } from 'react-router';
import { Button, Icon } from 'semantic-ui-react';


class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      signedIn: false,
    }
  }

  componentWillMount () {
    var context = this;
    axios.get('/api/session').then(function(res) {
      if (typeof res.data === 'object') {
        context.setState({
          user: res.data,
          signedIn: true
        })
      } else {
        context.setState({
          user: {},
          signedIn: false
        })
      }
    })
  }

  componentWillReceiveProps (nextProps) {
    var context = this;
    axios.get('/api/session').then(function(res) {
      if (typeof res.data === 'object') {
        context.setState({
          user: res.data,
          signedIn: true
        })
      } else {
        context.setState({
          user: {},
          signedIn: false
        })
      }
    })
  }

  sidebarAddClass() {
    var sidebarClass = this.props.isOpen ? 'sidebar open' : 'sidebar';
    return sidebarClass;
  }

  handleSignout() {
    var context = this;
    axios.post('/signout', context.state.user).then(function(res) {
      browserHistory.push('/signin');
    });
  }

  handleSignin() {
    browserHistory.push('/signin');
  }

  render() {
    var context = this;
    if (this.state.signedIn) {
      var signOutOrSignIn = function () {
        return (
          <div className="sidebar-content">
            <Link className="signoutlink" onClick={() =>{context.props.toggleSidebar(); context.handleSignout()}}>
              <Icon
                name={'sign out'}
                inverted color='grey'
              />
              <span> Sign Out</span></Link>
          </div>
        )
      }
    } else {
      var signOutOrSignIn = function () {
        return (
          <div className="sidebar-content">
            <Link className="signinlink" onClick={() =>{context.props.toggleSidebar(); context.handleSignin()}}>
              <Icon
                name={'sign in'}
                inverted color='grey'
              />
              <span> Sign In</span>
            </Link>
          </div>
        )
      }
    }
    return (
      <div className="sidebarContainer">
        <img src='http://www.freeiconspng.com/uploads/menu-icon-13.png'
          className="burger-button" onClick={this.props.toggleSidebar} />
        <div className={this.sidebarAddClass()}>
          <div className="sidebar-links">
            <div className="sidebar-content">
              <Link to="/explore" className="maplink" onClick={this.props.toggleSidebar}>
                <Icon
                  name={'map signs'}
                  inverted color='grey'
                />
                <span> Explore</span>
              </Link>
            </div>
            <div className="sidebar-content">
              <Link to="/trending" className="userfeedlink" onClick={this.props.toggleSidebar}>
                <Icon
                  name={'leaf'}
                  inverted color='grey'
                />
                <span> Trending</span>
                </Link>
            </div>
            <div className="sidebar-content">
              <Link to="/profile" className="profilelink" onClick={this.props.toggleSidebar}>
                <Icon
                  name={'user'}
                  inverted color='grey'
                />
                <span> Profile</span></Link>
            </div>
            {signOutOrSignIn()}
          </div>
        </div>
      </div>
    );
  }
}

export default Sidebar;
