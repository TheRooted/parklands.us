import React, {Component} from 'react';
import axios from 'axios';
import moment from 'moment';

export default class Comment extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: ''
    };
  }

  componentWillMount() {
    var context = this;
    axios.get('/api/username', {
      params: {
        userId: context.props.userId
      }
    })
    .then(function (res) {
      context.setState({
        user: res.data
      });
    });
  }

  render () {


    return (
      <div className="comment-container">
        <div className='comment'>
          <strong>{`${this.state.user.firstName} - `}</strong>
          <small>{moment.utc(this.props.dateTime).fromNow()}</small>
          <p>{this.props.text}</p>
        </div>
      </div>
    );
  }
}
