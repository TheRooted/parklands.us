import React from 'react';
import Nav from './navigation/Nav.js';
import Landing from './Landing/Landing.js';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div>
        <h1> am i render or am i dancer? </h1>
        <Nav />
        <div>{this.props.children}</div>
      </div>
    )
  }
}

export default App;