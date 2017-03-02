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

<<<<<<< HEAD
=======
  /*TODO:
    componentWillMount:
      grab overallRating in SNP page (not here)

  */
>>>>>>> allow seeding of online db
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
      userId: 106

    }
    axios.post('/api/rating', userRating).then(function(res) {
      //TODO ** PASS AVERAGE BACK TO SNP **
      console.log('rating has been saved', res)
      context.props.updateAverageRating(res.data.averageRating);
    })
  }

  render () {
    return (
<<<<<<< HEAD
      <div className="rating-container">
        <Rating
          className={'rating-star'}
=======
      <div>
        <Rating
>>>>>>> allow seeding of online db
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
