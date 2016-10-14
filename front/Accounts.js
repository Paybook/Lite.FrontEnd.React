import React from 'react';
import { connect  } from 'react-redux';
import store from './redux/store';
import apicall from './redux/apicall';
import actions from './redux/actions';
import styles from './constants/styles.js';


import Avatar from 'material-ui/Avatar';
import AppBar from 'material-ui/AppBar';
import AutoComplete from 'material-ui/AutoComplete';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
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
import ListItem from 'material-ui/List/ListItem';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import CircularProgress from 'material-ui/CircularProgress';

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
		var test = this.props.environmentState
		
		!function(w,d,s,id,r){ 

		    w[r]={};  
		    w[r]=w[r]||function(){w[r].q=w[r].q||[].push(arguments)}; 
		    var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https'; 
		    js=d.createElement(s); 
		    js.id=id;  
		    js.onload=function(){
		    	if(test){
		    		syncWidget.setTest()
		    	}		    	
		    };  
		    js.src=p+"://www.paybook.com/sync/widget.js"; 
		    fjs.parentNode.insertBefore(js,fjs); 

	     	
	    }(window,document,"script","sync-widget", 'syncWidget');


		syncWidget.options = {token:this.props.user.token, baseDiv: 'sync_container', theme: 'ligth', setTest: true};  

	},	
	render: function() {
		var t = this;
		return (
			<div>
			<div className="col-md-2"></div>
			<Paper className="text-center" className="col-md-8">
				<div id="sync_container"></div>
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
			store.dispatch({
				type:"CATALOGUES_ADD",
				catalogues:response
			})
			if(s.accountsState.cataloguesStatus.length === 0 || s.accountsState.cataloguesStatus.length != response.length){
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
		if(this.props.twofa){

			var twofa = this.props.twofa.twofa[0]
			if(twofa.imgBase64File){
				var data = twofa.imgBase64File;
				return(
					<img src={data}/>
				)
			}
			else{ 
				return null
			}
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
			id_credential: this.props.twofa.original.id_credential,
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
	        		
	        		<div style={{"marginBottom":"24px", "marginTop":"24px"}} 
	        			id="twofaImgContainer"
	        			className="text-center">
	        			{t.twofaImg()}
	        		</div>

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
			return <Widget user={tp.user} environmentState={tp.environmentState}/>
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
	environmentState: store.enviromentState
  };
}


export default connect(mapStateToProps)(Accounts);