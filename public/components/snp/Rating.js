import React from 'react';
import axios from 'axios';
import { Rating } from 'semantic-ui-react';

class RatingPark extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userStars: 0
    }
  }

  componentWillReceiveProps(nextProps) {
    var context = this;
    if (this.props.parkId !== nextProps.parkId) {
      axios.get('/api/rating', {
        params: {
          parkId: nextProps.parkId,
          // **TODO: get userID from session **
          userId: 106
        }
      })
      .then(function(res){
        // set state of the userStars
        var star = parseInt(Math.round(res.data.rating));
        context.setState({userStars: star})
      })
    }
  }

  handleRate (e, data) {
    var context = this;
    this.setState({userStars: data.rating})
    var userRating = {
      ratingVal: data.rating,
      parkId: context.props.parkId,
      // *******FIXME: userId hardcoded******
      userId: 106

    }
    axios.post('/api/rating', userRating).then(function(res) {
      context.props.updateAverageRating(res.data.averageRating);
    })
  }

  render () {
    return (
      <div className="rating-container">
        <Rating
          className={'rating-star'}
          icon={'star'}
          maxRating={5}
          clearable={true}
          rating={this.state.userStars}
          size= {'large'}
          onRate={this.handleRate.bind(this)}
        />
      </div>
    );
  }
}

export default RatingPark;
