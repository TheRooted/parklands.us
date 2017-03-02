import React from 'react';
import Nav from './navigation/Nav.js';
import Landing from './landing/Landing.js';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className='appContainer'>
        <Nav />
        <div className='app-children'>{this.props.children}</div>
      </div>
    )
  }
}

export default App;
