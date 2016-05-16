/**
 * In this file, we create a React component
 * which incorporates components providedby material-ui.
 */

//Pluings
import React from 'react';
import { Provider } from 'react-redux';
import { connect  } from 'react-redux'
import store from '../redux/store'


import PageWrapper from './PageWrapper.js';
import Routes from "../constants/Routes.js"

let Pages = {};
Routes.forEach(function(route){
  Pages[route.component] = require("../"+route.component+".js");
})


import {cyan500,cyan700, lightBlack, pinkA200, 
grey50, grey100, grey200, grey300, grey500, grey600, grey700, white,  
blueGrey700, blueGrey500, blueGrey300,
lightBlue600, lightBlue300, lightBlue100} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

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



var AppContainer = React.createClass({
  getInitialState: function(){
    return {drawer: true}
  },
  handleToggle: function(){ 
    this.setState({drawer: !this.state.drawer})
  },
  loadPage: function(){
    let page = React.createElement(Pages[this.props.page].default)
    return page
  },
  switchPage: function(){

  },
  render: function() {

    return (

    <div store={store}>
    <PageWrapper>

          <div>
            {this.loadPage()}
          </div>

    </PageWrapper>
    </div>


    );
  }
});



const mapStateToProps = function(store) {
  return {
    page: store.pageState
  };
}


export default connect(mapStateToProps)(AppContainer);