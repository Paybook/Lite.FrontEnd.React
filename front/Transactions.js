
import React from 'react';
import { connect  } from 'react-redux';
import store from './redux/store';
import apicall from './redux/apicall';
import actions from './redux/actions';
import styles from './constants/styles.js';

//MUI Componentes
import AutoComplete from 'material-ui/AutoComplete';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Table from 'material-ui/Table';
import TableHeader from 'material-ui/Table/TableHeader';
import TableRow from 'material-ui/Table/TableRow';
import TableHeaderColumn from 'material-ui/Table/TableHeaderColumn';
import TableRowColumn from 'material-ui/Table/TableRowColumn';
import TableBody from 'material-ui/Table/TableBody';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';


var Transactions = React.createClass({
	componentDidMount:function(){
		actions.getTransactions();
		actions.getAccounts();


	},
	transactionsList: function(){
		var t = this;
		var list = []



		t.props.transactionsFiltered.map(function(tran,i){
			var date = new Date(tran.dt_transaction*1000).toString().slice(0,24);
			list.push(
				<TableRow key={i}>
					<TableRowColumn>{date}</TableRowColumn>
					<TableRowColumn>{tran.description}</TableRowColumn>
					<TableRowColumn>{tran.accountName}</TableRowColumn>
					<TableRowColumn className="text-right">{"$ "+(tran.amount.toFixed(2))}</TableRowColumn>
					<TableRowColumn>
						{!tran.attachments?null:
						<IconButton tooltip="Font Icon" 
						onClick={t.downloadAttachment.bind(null, tran.attachments)}>
					      <FontIcon className="mdi mdi-cloud-download"></FontIcon>
					    </IconButton>
					    }
					</TableRowColumn>
				</TableRow>
			  )
		})		
		
		return list

	},
	downloadAttachment: function(att) {
		att = att[0];
		var url = 'https://sync.paybook.com/v1'+att.url+'?token='+this.props.user.token;
		window.open(url, '_blank');
  		win.focus();
	},
	handleAccountSelect: function(object,value){
		actions.setAccount(object.id_account)
		actions.getTransactions()
	},
	clearAccount: function(){
		actions.setAccount()
		actions.getTransactions()
	},
	showImg: function(){

		var imgData = "data:image/gif;base64,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"
		//imgData += "=="
		var div = document.getElementById("twofaContainer");
		var image = new Image();
		image.src = imgData
		document.body.appendChild(image);
	},
	handleSearch: function(event, val){
		actions.filterTransactions(val)

	},
	render: function() {
		var t = this;
		return (
			<div className="col-md-12">
			<h2> Transactions	</h2>
				
				<Paper style={{"padding":"18px","marginBottom":"10px"}} className="col-md-12">

					<div className="col-md-8">
						<TextField
					      hintText="Search transaction"
					      floatingLabelText="Search transaction"
					      style={styles.textField}
					      onChange={t.handleSearch}
					    />
					</div>

				    <div className="col-md-4">
					{
						t.props.currentAccount == null?
						<AutoComplete
						  ref="AccAutoComplete"
				          hintText="Select an account"
				          dataSource={t.props.accountsSelected}
				          onNewRequest={t.handleAccountSelect}
				          filter={AutoComplete.caseInsensitiveFilter}
				          floatingLabelText="Filter by account"
				          fullWidth={true}
				   		/>: <FlatButton label="Show all accounts" onClick={t.clearAccount}/>
			   		}
			   		</div>

				</Paper>

				{
				t.props.transactions.length > 0?	
				<Paper className="col-md-12">



				  <Table selectable={false} displayRowCheckbox={false}>
					<TableHeader adjustForCheckbox={false} displaySelectAll={false}>
					  <TableRow>
					  	<TableHeaderColumn>Date</TableHeaderColumn>
						<TableHeaderColumn>Description</TableHeaderColumn>
						<TableHeaderColumn>Account</TableHeaderColumn>
						<TableHeaderColumn>Amount</TableHeaderColumn>
						<TableHeaderColumn>Attachment</TableHeaderColumn>
					  </TableRow>
					</TableHeader>
					<TableBody displayRowCheckbox={false}>
					  
					 {t.transactionsList()}
					</TableBody>
				  </Table>
				</Paper>	
				: null
				}
								
			</div>
		);
	}
});


const mapStateToProps = function(store) {
  return {
	user: store.userState,
	transactions: store.accountsState.transactions,
	transactionsFiltered: store.accountsState.transactionsFiltered,
	currentAccount: store.accountsState.currentAccount,
	newSiteCredentials: store.accountsState.newSiteCredentials,
	accountsSelected: store.accountsState.accountsSelected,
	currentAccount: store.accountsState.currentAccount,
  };
}


export default connect(mapStateToProps)(Transactions);