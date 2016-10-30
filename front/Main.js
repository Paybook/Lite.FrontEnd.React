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


//Fingerprint


var Main =  React.createClass({
	componentDidMount: function() {
	},
	render: function() {
		var t = this;
		var tp = this.props;



		return(<h1>Test</h1>)

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


export default connect(mapStateToProps)(Main);