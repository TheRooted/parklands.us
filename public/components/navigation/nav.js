import React from 'react';
import SearchBar from './SearchBar.js';
import BurgerBar from './BurgerBar.js';


class Nav extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        query: ''
      }
    }

  getQuery(event) { 
    this.setState({query: event.target.value})
  } 

  handleSubmit(event) {
    // based on input, redirect to specific page.
    console.log('beans');
    event.preventDefault();

  }

  render () { 
    return (
      <div className='navigation'>
        <SearchBar 
          getQuery={this.getQuery.bind(this)}
          handleSubmit={this.handleSubmit.bind(this)}
        />
        <span>Parklands</span>
        <BurgerBar />
     </div>
    )
  }
}

export default Nav;