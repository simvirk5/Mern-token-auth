import React, { Component } from 'react'
import axios from 'axios';
import { Redirect } from 'react-router-dom'


class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			email: '',
			password: ''
		};
	}

	handleNameChange = (e) => {
		this.setState({ name: e.target.value });
	}

	handleEmailChange = (e) => {
		this.setState({ email: e.target.value });
	}
	handlePasswordChange = (e) => {
		this.setState({ password: e.target.value });
	}

	handleSubmit = (e) => {
		e.preventDefault();
		console.log('form was submitted', this.state);
		//post route, passing this.state that has email, name, pass
		axios.post('/auth/signup', this.state)
		.then(result => {
			console.log('SUCCESS!', result);
			localStorage.setItem('mernToken', result.data.token);
			//Update the user
			//call to App.js
			this.props.updateUser();
		})
		.catch(err => {
			console.log('ERROR', err);
		});
	}


	render() {
		if(this.props.user){
			return(<Redirect to="/profile" />);
		}
		return(

			<div>
				<h2>Signup as new user</h2>
				<form onSubmit={this.handleSubmit}> 
					<div>
						<input name="Name" placeholder="What is your name?" value={this.state.name} onChange= {this.handleNameChange} />
					</div>
					<div>
						<input name="Email" placeholder="What is your email?" value={this.state.email} onChange= {this.handleEmailChange} />
					</div>
					<div>
						<input name="Password" type="password" value={this.state.password} onChange= {this.handlePasswordChange} />
					</div>
					<input type="submit" value="Sign Me Up" className="button" />
				</form>
			</div>


		);
	}
}

export default Signup; 