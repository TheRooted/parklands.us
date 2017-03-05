import React from 'react';
import {browserHistory, Link} from 'react-router';
import SearchBar from './SearchBar.js';
import BurgerBar from './BurgerBar.js';


class Nav extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        query: '',
        parkList: ['Acadia', 'American Samoa', 'Arches', 'Badlands', 'Big Bend', 'Biscayne', 'Black Canyon of the Gunnison', 'Bryce Canyon', 'Canyonlands', 'Capitol Reef', 'Carlsbad Cavern', 'Channel Islands', 'Congaree', 'Crater Lake', 'Cuyahoga Valley', 'Death Valley', 'Denali', 'Dry Tortugas', 'Everglades', 'Gates of the Arctic', 'Glacier', 'Glacier Bay', 'Grand Canyon', 'Grand Teton', 'Great Basin', 'Great Sand Dunes', 'Great Smoky Mountains', 'Guadalupe Mountains', 'Haleakalā', 'Hawaii Volcanoes', 'Hot Springs', 'Isle Royale', 'Joshua Tree', 'Katmai', 'Kenai Fjords', 'Kings Canyon', 'Kobuk Valley', 'Lake Clark', 'Lassen Volcanic', 'Mammoth Cave', 'Mesa Verde', 'Mount Rainier', 'North Cascades', 'Olympic', 'Petrified Forest', 'Pinnacles', 'Redwood', 'Rocky Mountain', 'Saguaro', 'Sequoia',  'Shenandoah', 'Theodore Roosevelt', 'Virgin Islands', 'Voyageurs', 'Wind Caves', 'Wrangell-St. Elias', 'Yellowstone', 'Yosemite', 'Zion']

      }
    }

  getQuery(event) {
    this.setState({query: event.target.value})
  }

  handleSubmit(event) {
    // based on input, redirect to specific page.
    console.log('beans');
    var parkName = this.state.query.toLowerCase();
    browserHistory.push('/park/' + parkName);
    event.preventDefault();

  }

  render () {
    return (
      <div className='navigation'>
        <SearchBar
          getQuery={this.getQuery.bind(this)}
          handleSubmit={this.handleSubmit.bind(this)}
          parkList={this.state.parkList}
        />
        <BurgerBar />
        <span className="title-container">
          <img src='http://i.imgur.com/bLIxJyM.png' style={{height: '25px' }}/>
          <Link to='/mapview' style={{textDecoration: 'none', color: 'black'}}>Parklands</Link>
        </span>
     </div>
    )
  }
}

export default Nav;
