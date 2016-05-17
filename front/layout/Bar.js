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

import Routes from "../constants/Routes.js"
import apicall from '../redux/apicall'


const styles = {
  title: {
    cursor: 'pointer',
  },
};




var Bar = React.createClass({
  getInitialState: function(){
    return {drawer: true, menu:false, anchorMenu: null}
  },
  componentDidMount: function(){
    return
      console.log("BAR")
      apicall.login({username:"ejemplo", password:"ejemplo"},
      function(response){
        var token = response.token
        console.log("========================================TOKEN")
        console.log(token)

        actions.loaderOff();
        store.dispatch({
          type:"LOGIN_RESET"
        })
        store.dispatch({
          type:"USER_AUTH",
          username: "ejemplo",
          token: token
        })
        actions.pageLoad("Transactions")
      },
      function(error){
        console.log(error)
        actions.loaderOff();
        actions.error(error.responseText)
      });

  },
  handleToggle: function(){ 
    store.dispatch({
      type:"DRAWER_TOGGLE"
    })

  },
  loadPage: function(page){
    store.dispatch({
      type:'PAGE_LOAD',
      page:page
    })

  },
  noUserButtons:function(){
    return(
      <span>
        <FlatButton label="Login" onClick={this.loadPage.bind(null,"Login")} style={{color:"white"}}/>
        <FlatButton label="Sign Up" onClick={this.loadPage.bind(null,"Signup")} style={{color:"white"}}/>
      </span>
    )
  },
  handleClick: function(event){
    event.preventDefault();
    this.setState({
      anchorMenu:event.currentTarget,
      menu: true
     })
  },
  handleCloseMenu: function(){
    this.setState({
      menu: false,
    });
  },
  userLogout: function(){
    store.dispatch({
      type:"USER_LOGOUT"
    })
    actions.pageLoad("Login")
  },
  userButtons: function(){
    return(
      <span>
        <Avatar
          style={{marginTop:"5px", cursor:"pointer"}}
          size={40}
          color="white"
          backgroundColor="#2D2BB7"
          onClick={this.handleClick}
        >
          {this.props.user.username[0].toUpperCase()}
        </Avatar>
        <Popover
          open={this.state.menu}
          anchorEl={this.state.anchorMenu}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleCloseMenu}
        >
          <Menu>
            <MenuItem primaryText="Logout" onClick={this.userLogout} leftIcon={<span className="mdi mdi-logout"/>}/>
          </Menu>
        </Popover>
      </span>
    )
  },
  render: function() {
    var t = this;
    var userSection = (
     <span >
        {!this.props.user.username?this.noUserButtons():this.userButtons()}
        
      </span>
    );  

    return (
      <div>
        <AppBar
          title={<span style={styles.title}>Lite.Payboook</span>}
          iconElementRight={userSection}
          iconElementLeft={
            <IconButton onClick={this.handleToggle} > 
              <FontIcon className="mdi mdi-menu"></FontIcon>
              
            </IconButton>}
        />
      </div>
    );
  }
});

const mapStateToProps = function(store) {
  return {
    user: store.userState
  };
}


export default connect(mapStateToProps)(Bar);
//export default Bar;
