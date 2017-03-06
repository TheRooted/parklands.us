import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { Rating } from 'semantic-ui-react'

class Parkcomment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userRating: 1
    }
  }

  componentWillMount() {
    var context = this
    axios.get('/api/rating', {
      params: {
        parkId: this.props.parkId,
        userId: this.props.userId
      }
    }).then(function(res) {
      context.setState({userRating: res.data.rating})
    })
  }

  componentWillReceiveProps(nextProps) {
    var context = this
      if (this.props.parkId !== nextProps.parkId || this.props.text !== nextProps.text) {
      axios.get('/api/rating', {
        params: {
          parkId: nextProps.parkId,
          userId: nextProps.userId
        }
      }).then(function(res) {
        console.log('res.data', res.data.rating)
        context.setState({userRating: res.data.rating}, function() {
          console.log(' ', this.state.userRating)
        })
      })
    }
  }

  render () {
    return (
      <div className= 'parkcommentContainer'>
        <div className='parkCommentHeader'>
          <h4 className='parkcommentusername'>{this.props.firstName}</h4>
          <Rating
            className={'allUserRating'}
            icon={'star'}
            maxRating={5}
            rating={this.state.userRating}
            size={'tiny'}
            disabled={true}
          />
        </div>
        <p className='parkcomment'>{this.props.text}</p>
        <small>{moment.utc(this.props.datePosted).fromNow()}</small>
      </div>
    )
  }
};


export default Parkcomment;
