import React from 'react'

class SocialMediaFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render () {
    return (
      <div className='allNewsFeed'>
        <a className="twitter-timeline" data-width="300" data-height="800" href="https://twitter.com/jackieNPS/lists/national-parks"></a>
     </div>
    )
  }
}

export default SocialMediaFeed;


// Twitter accounts missing from list: 
// Great Sand Dunes, Hot Springs, Isle Royale, Kobuk Valley, Mesa Verde, Virgin Islands, Voyageurs