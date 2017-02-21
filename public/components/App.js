import React from 'react';
import Nav from './navigation/Nav.js';
import Grid from './landing/Grid.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }

  render() {
    return (
      <div>
        <h1> am i render or am i dancer? </h1>
        <Nav user={this.state.user} />
        <Grid />
      </div>
    )
  }
}

export default App;