import React from 'react';
import axios from 'axios';
import { Rating } from 'semantic-ui-react';

class RatingPark extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userStars: 0,
    }
  }

  /*TODO:
    componentWillMount:
      grab userRating from database
      grab overallRating in SNP page (not here)

      investigate componentWillMount vs recieveProps in like.js

  */
  componentWillReceiveProps(nextProps) {
    var context = this;
    if (this.props.parkId !== nextProps.parkId) {
      axios.get('/api/rating', {
        params: {
          parkId: nextProps.parkId,
          // **TODO: get userID from session **
          userId: 105
        }
      })
      .then(function(res){
        // set state of the userStars
        console.log('come back to meee',res)
        var star = parseInt(res.data.rating);
        context.setState({userStars: star})
      })
    }
  }

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
          rating={this.state.userStars}
          size= {'large'}
          onRate={this.handleRate.bind(this)}
        />
      </div>
    );
  }
}

export default RatingPark;
