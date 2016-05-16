/**
 * In this file, we create a React component
 * which incorporates components providedby material-ui.
 */

import React from 'react';
import { connect  } from 'react-redux'
import store from '../redux/store'


//import {deepOrange500} from 'material-ui/styles/colors';
import {cyan500,cyan700, lightBlack, pinkA200, 
grey50, grey100, grey200, grey300, grey500, grey600, grey700, white,  
blueGrey700, blueGrey500, blueGrey300,
lightBlue600, lightBlue300, lightBlue100} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import RaisedButton from 'material-ui/RaisedButton';

import Bar from './Bar.js';
import ErrorComponent from './Error.js';
import Loader from './Loader.js';
import Message from './Message.js';
import DrawerMenu from './DrawerMenu.js';

const styles = {
  wrapper: {},
  page:{
    paddingTop:"20px",
    paddingLeft:"26px",
    paddingRight:"26px",
    marginLeft:"200px",
  },
};

/*
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: blueGrey700,
    primary2Color: blueGrey500,
    primary3Color: lightBlack,
    accent1Color: lightBlue600,
    accent2Color: lightBlue300,
    accent3Color: lightBlue100,
    textColor: grey600,
    alternateTextColor: white,
    canvasColor: grey50,
    borderColor: grey300,
    pickerHeaderColor: cyan500,
  },
});
*/

var muiTheme = getMuiTheme({
  palette: {
    primary1Color: lightBlue600,
    primary2Color:lightBlue300,
    primary3Color: lightBlue100,
    accent1Color: blueGrey700,
    accent2Color:  blueGrey500,
    accent3Color: lightBlack,
    textColor: grey600,
    alternateTextColor: white,
    canvasColor: grey50,
    borderColor: grey300,
    pickerHeaderColor: cyan500,
  },
});




let Pages = {};
Pages["Login"] = require("../Login.js");

var PageWrapper = React.createClass({
  getInitialState: function(){
    return {drawer: true}
  },
  handleToggle: function(){ 
    this.setState({drawer: !this.state.drawer})
  },
  render: function() {

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.wrapper}>
          <Bar loadPage={this.loadPage}></Bar>

          <div style={styles.page}>
            {this.props.children}         
          </div>
          <ErrorComponent/>
          <Loader/>
          <Message/>
          <DrawerMenu></DrawerMenu>

        </div>
       </MuiThemeProvider>

    );
  }
});

const mapStateToProps = function(store) {
  return {
    page: store.userState
  };
}


export default connect(mapStateToProps)(PageWrapper);



