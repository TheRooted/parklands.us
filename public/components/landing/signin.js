import React from 'react';
import axios from 'axios';
//need links from react-router?

export default class Signin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	handleSubmit() {
		var user = {
			firstName: this.refs.firstNameSI.value,
			lastName: this.refs.lastNameSI.value,
			email: this.refs.emailSI.value,
			password: this.refs.passwordSI
		}
		axios.post('/api/signin', user).then(function(res) {
			if (res.data) {
				console.log('successful signin')
			}
		})
	}
	render() {
		return (
			<div>
				<form>
					<h5>Sign In!</h5>
					<input type="text" name="firstName" placeholder="First Name" ref="firstNameSI" />
					<br />
					<input type="text" name="lastName" placeholder="Last Name" ref="lastNameSI" />
					<br />
					<input type="email" name="email" placeholder="Email Address" ref="emailSI" />
					<br />
					<input type="password" name="password" placeholder="Password" ref="passwordSI" />
					<br />
					<button type="submit" onClick={this.handleSubmit.bind(this)}>Sign In!</button>

				</form>
			</div>
		)
	}
}