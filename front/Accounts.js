

import React from 'react';
import { connect  } from 'react-redux'
import store from './redux/store'
import apicall from './redux/apicall'
import actions from './redux/actions'
import styles from './constants/styles.js'


import Avatar from 'material-ui/Avatar';
import AppBar from 'material-ui/AppBar';
import AutoComplete from 'material-ui/AutoComplete';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'
import Toggle from 'material-ui/Toggle';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import Card from 'material-ui/Card';
import CardHeader from 'material-ui/Card/CardHeader';
import CardText from 'material-ui/Card/CardText';
import CardMedia from 'material-ui/Card/CardMedia';
import CardTitle from 'material-ui/Card/CardTitle';
import CardActions from 'material-ui/Card/CardActions';
import Paper from 'material-ui/Paper';
import Drawer from 'material-ui/Drawer';
import List from 'material-ui/List';
import ListItem from 'material-ui/List/ListItem'
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import CircularProgress from 'material-ui/CircularProgress'

var DynamicFields =  React.createClass({
	getInitialState:function(){
		return {credentials:{}}
	},
	handleChange: function(index,event,value){
		var newCred = this.state.credentials;
		var f = this.props.fields;
		var field = f[index];
		newCred[field.name] = value;
		this.setState({credentials:newCred})
	},
	handleValidation: function(credentials){
		var allValues = true;

		for(let n in this.props.fields){
			var field = this.props.fields[n];
			if(credentials[field.name] == null || credentials[field.name] == ""){
				actions.error("All fields are required")
				return null
			}
		}

		var response = {
			"credentials":credentials
		};


		this.props.onAction(response);
	},
	render: function() {
		var t = this;
		if(this.props.fields == undefined || this.props.fields == null){
			return null
		}
		return (
			<div className="text-center">
				{
					t.props.fields.map(function(field, i){
						return(
							<TextField
								key={i}
								onChange={t.handleChange.bind(null,i)}
								floatingLabelText={field.label}
								type={field.type}
								style={styles.textField}
							/>
						)
					})
				}

				<br></br>
				<RaisedButton label="Sincronizar"
					style={{marginTop:"32px"}}
					onClick={t.handleValidation.bind(null,t.state.credentials)}  
					primary
				/>
				
				<RaisedButton label="Cancelar"
					style={{marginLeft:"16px",marginTop:"16px"}}
				 	onClick={t.props.onCancel.bind(null,t.state.credentials)}  
				 	secondary
				/>
			</div>
		);
	}
});


var Widget =  React.createClass({
	componentDidMount: function(){
		//pbWidget.setDev();
       pbWidget.setToken(this.props.user.token);
       pbWidget.chooseBank();
	},	
	render: function() {
		return (
			<div>
			<div className="col-md-2"></div>
			<Paper className="text-center" className="col-md-8">
				<div id="paybook-container"></div>
			</Paper>
			<div className="col-md-2"></div>
			</div>
		);
	}
});

var AccountsContainer = React.createClass({
	getInitialState: function(){
		return {twofaToken: ""}
	},
	componentDidMount:function(){
		this.getCatalogs();
		this.getCredentials();
	},
	getCatalogs: function(){
		var s = store.getState();
		var data = {token: this.props.user.token}

		actions.loaderOn();
		apicall.catalogues(data,
		function(response){
			actions.loaderOff();
			console.log(response)
			store.dispatch({
				type:"CATALOGUES_ADD",
				catalogues:response
			})
			if(s.cataloguesStatus.length === 0 || s.cataloguesStatus.length != response.length){
				var status = [];
				response.map(function(cat){
					status.push(0)
				})
				store.dispatch({
					type:"CATALOGUES_STATUS",
					cataloguesStatus:status,
				})
			}
		},
		function(error){
			actions.loaderOff();
			actions.error(error.responseText)
		});

	},
	getCredentials: function(){
		//This thet the credentials for the siteas that are allready register
		var t = this;
		var data = {
			token: this.props.user.token,
		}
		actions.loaderOn();

		apicall.credentialsRequest(data,
		function(response){

			actions.loaderOff()
			store.dispatch({
				type:"SITES_GET",
				sites:response
			})
			
		},
		function(error){
			actions.loaderOff();
			actions.error(error.responseText)
		});
	},
	handleCredentialsSockets: function(data){
		if(!data){ return}
		var t = this;
		var socket = data.ws//+"?token="+this.props.user.token
		var credentialSocket = new WebSocket(socket);
		var isFinished = false
		actions.loaderOn();



		var errorCredential = function(id_credential){
			t.handleSiteDelete(data.id_credential);
			actions.loaderOff();
			isFinished = true;
		}

		var finish = function(){
			isFinished = true;
			actions.loaderOff();
			t.getCredentials();
		}

		setTimeout(function(){
			if(isFinished != true){
				actions.loaderOff();
				errorCredential(data.id_credential)
			}			
		},60000);

		var originalData = data;
		


		credentialSocket.onmessage = function (event) {
			var data = JSON.parse(event.data);
			if(data.error != undefined){	
				actions.error(data.error);
				actions.loaderOff();
			}

			var code  = data.code;
			if (code == 100){
				actions.message("Connecting with the bank")
			}
			if (code == 101){
				actions.message("Connecting with the bank")
			}
			if (code == 102){
				actions.message("Connection successful")
				finish();
			}
			if (code == 200){
				actions.message("Data was process correctly")
				finish();
			}
			if (code == 201){
				actions.message("Data was process correctly")
				finish();
			}
			if (code == 202){
				actions.message("No transactions found")
				finish();
			}
			if( code == 401){
				actions.message("Invalid credentials");
				errorCredential(data.id_credential)
			}
			if( code == 405){
				actions.message("Account is locked");
				errorCredential(data.id_credential)
			}
			if( code == 406){
				actions.message("User is already logged");
				errorCredential(data.id_credential)
			}
			if( code == 410){
				isFinished = true;
				t.handleTwofa(data, originalData);
			}
			if( code >= 500){
				actions.message("Server error");
				errorCredential(data.id_credential)
			}


		}
		
	},
	handleCredentialsAdd: function(data){
		var t = this;
		t.handleSiteClear();
		data.id_site = this.props.newSiteId;
		data.token = this.props.user.token;
		this.handleSiteClear()

		actions.loaderOn();

		apicall.credentialsRegister(data,
		function(response){
			actions.loaderOff()
			response.id_site = data.id_site;
			t.handleCredentialsSockets(response)
		},
		function(error){
			actions.loaderOff();
			actions.error(error.responseText)
		});
	},
	handleSiteSelect: function(object,value){
		store.dispatch({
			type:"SITE_ADD",
			name: object.name,
			id_site:object.id_site,
			credentials: object.credentials,
		})
		//this.refs.AccountAutoComplete.searchText("")
	},
	handleSiteDelete: function(id_credentials){
		var t = this;
		var data = {
			id_credential: id_credentials,
			token: this.props.user.token,
		}
		actions.loaderOn();
		apicall.credentialsDelete(data,
		function(response){
			actions.loaderOff();
			t.getCredentials();
		},
		function(error){
			actions.loaderOff();
			actions.error("error:"+error)
		});
	},
	handleSiteClear: function(){
		store.dispatch({
			type:"SITE_CLEAR",
		})
	},
	handleUpdateInput(text) {
	  this.setState({
	    searchText: text
	  })
	},
	accountDrawerOpen: function(){
		if(this.props.newSiteName == null){	return false}
		else{	return true}
	},
	twofaImg: function(){
		return null
		if(this.props.twofa){
			//"imgBase64File"
			var data = "data:image/png;base64,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…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"
			return(
				<img src={data}/>
			)
		}	
		else{ return null}
	},
	handleTwofa: function(data, originalData){
		actions.loaderOff();
		actions.message("Authentication required")

		data.original = originalData;
		store.dispatch({
			type:"TWOFA_SET",
			twofa: data
		})
	},
	handleTwofaField: function(event, value){
		this.setState({twofaToken: value})
	},
	handleTwofaSubmit: function(){

		var t = this;
		var data = {
			tokenName:this.props.twofa.twofa[0].name,
			token: this.state.twofaToken,
			address: this.props.twofa.original.twofa,
			tokenUser: this.props.user.token,
			id_site: this.props.twofa.original.id_site,
			twofa: this.props.twofa.twofa,

		};
		
		actions.loaderOn();
		apicall.twofaResponse(data, 
		function(response){
			
			t.handleTwofaDismiss();
			actions.loaderOff();
		},
		function(error){
			actions.error(error);
			t.handleTwofaDismiss();
			actions.loaderOff();
		})
	},
	handleTwofaDismiss: function(){
		store.dispatch({
			type:"TWOFA_CLEAR",
			twofa: false
		})
	},

	handleExpandSite: function(site, index, expand){
		
		var t = this;
		if(expand){
			var data = {
				id_site: site.id_site,
				token: this.props.user.token,
			}


			
			apicall.getAccounts(data, 
			function(response){

				store.dispatch({
					type:'ACCOUNTS_ADD',
					accounts: response,
					id_site: data.id_site,
					index: index
				})
				
			},
			function(error){
				actions.error(error)
			})
		}
		
	},
	transactionsList: function(indexSite, indexAccount){

		var transactions = this.props.transactions[indexSite][indexAccount];
		var listTransactions = []

		transactions.map(function(trans,idx){
			listTransactions.push(
				<ListItem
		            key={1}
		            primaryText={trans.description+" $"+trans.amount}
				/>
			)
		})
		return transactions
	},
	setAccount: function(id_account){
		actions.setAccount(id_account)
		actions.getTransactions()
		actions.pageLoad("Transactions")

	},
	accountsList: function(index){
		var t = this;
		var accounts = this.props.accounts[index];
		return(
			<List>
				{
				accounts.map(function(acc, idx){
					return(
						<ListItem
						 key={idx}
						 primaryText={acc.name}
						 secondaryText={"Balance: $"+acc.balance}
						 //initiallyOpen={false}
						 leftAvatar={<Avatar>{acc.name[0].toUpperCase()}</Avatar>} 
						 //primaryTogglesNestedList={true}
						 //onNestedListToggle={t.handleExpandList.bind(null,acc,idx,index)}
				       	 //nestedItems={t.transactionsListbind()}
				       	 onClick={t.setAccount.bind(null,acc.id_account)}
						/>
					)
				})


				}
				
			</List>
		)
	},
	render: function() {
		var t = this;
		return (
				
			<div>
				{t.twofaImg()}
				{/* Drawer for the dynamic fields*/}
				<Drawer width={300} openSecondary={true} open={t.accountDrawerOpen()} >
		          	<AppBar title="Add account" 
			          	iconElementLeft={
			           		 <IconButton onClick={this.handleToggle} onClick={t.handleSiteClear} > 
			              		<FontIcon className="mdi mdi-close"></FontIcon>              
			            	</IconButton>
		            	}
	        		/>

		        	<div>
		        		<DynamicFields 
			        		fields={this.props.newSiteCredentials} 
			        		onAction={t.handleCredentialsAdd}
			        		onCancel={t.handleSiteClear}
		        		/>
		        	</div>		          
		        </Drawer>

		    	{/* Drawer for twofa*/}
		        <Drawer width={300} openSecondary={true} open={t.props.twofa != false}>
		        	<AppBar title="Add account" 
			          	iconElementLeft={
			           		 <IconButton onClick={this.handleToggle} onClick={t.handleTwofaDismiss} > 
			              		<FontIcon className="mdi mdi-close"></FontIcon>              
			            	</IconButton>
		            	}
	        		/>
	        		<p></p>
	        		<TextField
						onChange={t.handleTwofaField}
						floatingLabelText={t.props.twofa?t.props.twofa.twofa[0].label:"Enter the token"}
						style={styles.textField}
					/>
					<div style={{paddingTop:"24px"}} className="col-md-12 text-center">
						<RaisedButton onClick={t.handleTwofaSubmit} label="Send" primary/>
					</div>
					<div style={{paddingTop:"16px"}} className="col-md-12 text-center">
						<RaisedButton onClick={t.handleTwofaDismiss} label="Cancel" secondary/>
					</div>
		        </Drawer>


				<h2> Accounts </h2>	 
				<div className="col-md-3"></div>
				<Paper className="col-md-6" style={styles.paper}>
					<AutoComplete
					  ref="AccountAutoComplete"
			          hintText="Select account"
			          dataSource={t.props.catalogues}
			          onNewRequest={t.handleSiteSelect}
			          filter={AutoComplete.caseInsensitiveFilter}
			          floatingLabelText="+ Add new account"
			          fullWidth={true}
			   		/>

				</Paper>	
				<div className="col-md-3"></div>

				<div className="col-md-12" style={{paddingTop:"24px"}}>
				{
					
					this.props.sites.map(function(site,index){
						return(
							<Card expandable={true} onExpandChange={t.handleExpandSite.bind(null,site,index)} key={index}>
						        <CardHeader
						          title={site.name}
						          subtitle={site.username}
						          avatar={
						          	<Avatar src={"https://s.paybook.com"+site.avatar}/>
						          } 
						          actAsExpander={true}
						          showExpandableButton={true}
						        />
						        <CardText expandable={true}>

						          <div>
						          	{
						          		(t.props.accounts[index] != undefined)?
						          		 t.accountsList(index):
						          		 <CircularProgress />
						          	}

						          	
						          </div>

						          <div style={{paddingTop:"36px"}}>
						          	<FlatButton
						          		label="Borrar Sitio" 
						          		onClick={t.handleSiteDelete.bind(null,site.id_credential)} 
						          		icon={<FontIcon className="mdi mdi-delete" />}
						          		secondary
						          	/>
						          </div>
						        </CardText>
					      	</Card>
						)

					})
					
				}
				</div>
				 		
			</div>
		);
		

	}
});


var Accounts =  React.createClass({
	render: function() {
		var t = this;
		var tp = this.props;
		if(this.props.widget === true){
			return <Widget user={tp.user}/>
		}
		else{
			return <AccountsContainer
						user={tp.user}
						newSiteId={tp.newSiteId}
						newSiteName={tp.newSiteName}
						newSiteName={tp.newSiteName}
						newSiteCredentials={tp.newSiteCredentials}
						catalogues={tp.catalogues}
						cataloguesStatus={tp.cataloguesStatus}
						sites={tp.sites}
						transactions={tp.transactions}
						twofa={tp.twofa}
						accounts={tp.accounts}
					/>
		}

	}
});

const mapStateToProps = function(store) {
  return {
  	accounts: store.accountsState.accounts,
	user: store.userState,
	newSiteId: store.accountsState.newSiteId,
	newSiteName: store.accountsState.newSiteName,
	newSiteCredentials: store.accountsState.newSiteCredentials,
	catalogues: store.accountsState.catalogues,
	cataloguesStatus: store.accountsState.cataloguesStatus,
	sites: store.accountsState.sites,
	transactions: store.accountsState.transactions,
	twofa: store.accountsState.twofa,
	widget: store.widgetState,
  };
}


export default connect(mapStateToProps)(Accounts);