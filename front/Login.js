
import React from 'react';
import { connect  } from 'react-redux';
import store from './redux/store';
import apicall from './redux/apicall';
import actions from './redux/actions';
import styles from './constants/styles.js';

//MUI Componentes
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';


var Login = React.createClass({
	getInitialState(){
		return {error:""}
	},
	submit: function(){
		store.dispatch({
			type:'LOGIN_SUBMIT',
		})

		let s = store.getState().loginState

		if(s.valid === false){
			actions.error("Error in fields")
			return 
		}

		actions.loaderOn();
		apicall.login({username:s.username, password:s.password},
		function(response){
			console.log(response)
			var token = response.response.token
			var type = response.response.type
			console.log(token+" "+type)
			actions.loaderOff();
			store.dispatch({
				type:"LOGIN_RESET"
			})
			store.dispatch({
				type:"USER_AUTH",
				username: s.username,
				token: token,
				typ: type
			})

			actions.pageLoad("Accounts")
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
	render: function() {
		return (
			<div>
				<h2> Login	</h2>
				<div className="col-md-3" ></div>
				<Paper zDepth={1} style={styles.paper} className="col-md-6 text-center" onKeyDown={this.handleKey}>
					<TextField
							floatingLabelText="Username"	
							style={styles.textField}
							onChange={this.handleChange.bind(null,"LOGIN_USERNAME")}	
							errorText={this.props.errors.username}	
							value={this.props.username}				
					/>
					<br></br>
					<TextField
						floatingLabelText="Password"
						type="password"
						style={styles.textField}
						onChange={this.handleChange.bind(null,"LOGIN_PASSWORD")}
						errorText={this.props.errors.password}
						value={this.props.password}	
					/>
					<br></br>
					<div style={{"marginTop":"36px"}}>
						<RaisedButton label="Login" style={styles.raisedButton} onClick={this.submit} primary/>
					</div>
					
				</Paper>
				<div className="col-md-3"></div>	
								
			</div>
		);
	}
});


const mapStateToProps = function(store) {
  return {
	username: store.loginState.username,
	password: store.loginState.password,
	errors: store.loginState.errors,
  };
}


export default connect(mapStateToProps)(Login);