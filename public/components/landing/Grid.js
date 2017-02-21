import React from 'react';
import axios from 'axios';
var GridElement = require('./GridElement');

export default class Grid extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			parks: [{name: 'Yosemite', rating: 0}],
		};
	}
	componentWillMount() {
		var context = this;
		axios.get('/api/grid').then(function(res) {
			if (res.data) {
				console.log('parks', res.data);
				context.setState({parks: res.data})
			}
		});
	}
	render () {
		return (
			<div>
				{this.state.parks.map(park =>
					<GridElement parkName={park.name} parkRating={park.rating} />
				)}
			</div>
		)
	}
}