import React from 'react';
import axios from 'axios';
import { Rating } from 'semantic-ui-react';

class RatingPark extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userStars: 2,
    }
  }

  /*TODO:
    componentWillMount:
      grab userRating from database
      grab overallRating in SNP page (not here)

    onClick handler for stars
      grab 'ratingVal' from table 'rating' where userID/parkID

  */

  handleRate (e, data) {
    var context = this;
    console.log('userRating', data.rating)
    this.setState({userStars: data.rating})
    var userRating = {
      ratingVal: data.rating,
      parkId: context.props.parkId,
      // *******FIXME: userId hardcoded******
      userId: 105

    }
    axios.post('/api/rating', userRating).then(function(res) {
      //TODO
      console.log('rating has been saved', res)
    })
  }

  render () {

    return (
      <div>
        <Rating
          icon={'star'}
          maxRating={5}
          defaultRating={this.state.userStars}
          size= {'large'}
          onRate={this.handleRate.bind(this)}
        />
      </div>
    );
  }
}

export default RatingPark;
