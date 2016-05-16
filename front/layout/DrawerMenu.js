/**
 * In this file, we create a React component
 * which incorporates components providedby material-ui.
 */

import React from 'react';
import { connect  } from 'react-redux'
import store from '../redux/store'
import actions from '../redux/actions'

import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Popover from 'material-ui/Popover';
import RaisedButton from 'material-ui/RaisedButton';
import Toolbar from 'material-ui/Toolbar';
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup';
import ToolbarSeparator from 'material-ui/Toolbar/ToolbarSeparator';

import routes from "../constants/Routes.js"




var DrawerMenu = React.createClass({
	getInitialState: function(){
		return {drawer: true}
	},
	loadPage: function(page){
		store.dispatch({
			type:'PAGE_LOAD',
			page:page
		})

	},
	render: function() {
		var t = this;

		return (
			<div>

				<Drawer 
					containerStyle={ {'top': '64px', 'position': 'absolute', 'zIndex':0} }
					open={this.props.drawer}
					width={200}
				>

						
					{ 
						routes.map(function(route,i){
							if(route.drawer === true){
								if(route.type === "private" && t.props.user.username === false){
									return null
								}
								else{
									return(
										<MenuItem onClick={t.loadPage.bind(null, route.component)} key={i}>
											<span className={route.icon}>&nbsp;&nbsp;&nbsp;</span>{route.title}
										</MenuItem>
									)
								}
							}
							else{ return null}
						})
					}

						
						
				</Drawer>
			</div>
		);
	}
});

const mapStateToProps = function(store) {
	return {
		user: store.userState,
		drawer: store.drawerState
	};
}


export default connect(mapStateToProps)(DrawerMenu);

