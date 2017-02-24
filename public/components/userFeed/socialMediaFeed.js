import React from 'react'
import axios from 'axios'
import { Timeline } from 'react-twitter-widgets'


class SocialMediaFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  // componentWillMount() {
  //   axios({
  //     url: 'https://api.twitter.com/1.1/search/tweets.json',
  //     method: 'get',
  //     params: {
  //       q: '#nationalpark',
  //       // HIDE KEY LATER
  //       key: 'iHnfp79PZuRkqzk3fE2yV8Gl3'

  //     }   
  //   })

  // }

  render () {
    return (
      <div>
        <Timeline
          dataSource={{
            sourceType: 'profile',
            screenName: 'NatlParkService'
          }}
          options={{
            username: 'TwitterDev',
            height: '600'
          }}
          onLoad={() => console.log('Timeline is loaded!')}
        />
      </div>
    )
  }

}

export default SocialMediaFeed;


//<a class="twitter-timeline"  href="https://twitter.com/hashtag/nationalpark" data-widget-id="834941590091137025">#nationalpark Tweets</a>
//<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>

