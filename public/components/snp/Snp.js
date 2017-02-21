import React from 'react';
import axios from 'axios';
import Nav from './../navigation/Nav.js';

export default class Snp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      park: {
        name: 'null',
        info: 'null',
      },
      view: 'Photos',
    }
  }

  componentWillMount() {
    var context = this;
    console.log(context.props.params.parkName);
    axios.get('/api/park/' + context.props.params.parkName).then(function(res) {
      console.log(res);
      if (res.data) {
        console.log('Snp parks:', res.data);
        context.setState({park: res.data})
      }
    })
  }

  capFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {
    return (
      <div>
        <Nav />
        <h1>{this.capFirstLetter(this.state.park.name)}</h1>
        <h5>Info</h5>
        <p>{this.state.park.info}</p>
      </div>
    )
  }
}