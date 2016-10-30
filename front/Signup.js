
import React from 'react';
import { connect  } from 'react-redux'
import store from './redux/store'
import apicall from './redux/apicall'
import actions from './redux/actions'

import styles from './constants/styles.js'


import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';


var Signup = React.createClass({
	getInitialState(){
		return {error:""}
	},
	cancel: function(){
		store.dispatch({
			type: 'SIGNUP_RESET'
		})

	},
	submit: function(){
		store.dispatch({
			type:'SIGNUP_SUBMIT',
		})

		let s = store.getState().signupState

		if(s.valid === false){
			actions.error("Error in fields")
			return 
		}

		actions.loaderOn();
		apicall.signup({username:s.username, password:s.password, type: s.type},
		function(response){
			console.log(response)
			store.dispatch({
				type:"PAGE_LOAD",
				page:"Login",
			})
			store.dispatch({
				type:"SIGNUP_RESET"
			})
			actions.loaderOff();
			actions.message("User created successfully");
		},
		function(error){
			console.log(error)
			actions.loaderOff();
			actions.error(error.responseText)
		});

	},
	handleChange:function(action,event, value){
		store.dispatch({
			type:action,
			value: value,
		})
	},
	handleKey: function(event){
		 if(event.keyCode == 13){
            this.submit()
         }
	},
	handleToggle: function(event,state){
		store.dispatch({
			type: 'SIGNUP_TYPE',
			st: state
		})
	},
	render: function() {
		var t = this;
		return (
			<div>
				<h2> SignUp	</h2>
				<div className="col-md-3"></div>
				<Paper zDepth={1} style={styles.paper} className="col-md-6 text-center" onKeyDown={this.handleKey}>
					<TextField
							floatingLabelText="Username"	
							style={styles.textField}
							onChange={this.handleChange.bind(null,"SIGNUP_USERNAME")}	
							errorText={this.props.errors.username}	
							value={this.props.username}				
					/>
					<br></br>
					<TextField
						floatingLabelText="Password"
						type="password"
						style={styles.textField}
						onChange={this.handleChange.bind(null,"SIGNUP_PASSWORD")}
						errorText={this.props.errors.password}
						value={this.props.password}	
					/>
					<br></br>
					<TextField
						floatingLabelText="Repeat password"
						type="password"
						style={styles.textField}
						onChange={this.handleChange.bind(null,"SIGNUP_PASSWORDREPEAT")}
						errorText={this.props.errors.passwordRepeat}
						value={this.props.passwordRepeat}	
					/>

					{
						t.props.type?
						<Toggle
					      label="Admin"
					      onToggle={t.handleToggle}
					      defaultToggled ={true}
					    />:
					    <Toggle
					      label="Admin"
					      onToggle={t.handleToggle}
					      defaultToggled ={false}
					    />

					}

					<br></br>
					<div style={{"marginTop":"36px"}}>
						<RaisedButton label="SignUp" style={styles.raisedButton} onClick={this.submit} primary/>
						<RaisedButton label="Cancel" style={styles.raisedButton} onClick={this.cancel} secondary/>
					</div>
					
				</Paper>
				<div className="col-md-3"></div>	
								
			</div>
		);
	}
});


const mapStateToProps = function(store) {
  return {
	username: store.signupState.username,
	password: store.signupState.password,
	type: store.signupState.type,
	passwordRepeat: store.signupState.passwordRepeat,
	errors: store.signupState.errors,
  };
}


export default connect(mapStateToProps)(Signup);