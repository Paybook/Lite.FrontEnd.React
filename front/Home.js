/**
 * In this file, we create a React component
 * which incorporates components providedby material-ui.
 */

//Pluings
import React from 'react';
import { connect  } from 'react-redux'
import store from './redux/store'
import styles from './constants/styles.js'


import Paper from 'material-ui/Paper';


var Home = React.createClass({
  render: function() {

    return (
      <div>
        <h1> </h1>
        

        <div className="col-md-12">
        <div className="col-md-2"></div>
        <Paper style={styles.paper} className="col-md-8 text-center">
          <img src="/paybooklogo.svg"></img>

        </Paper>
        <div className="col-md-2"></div>
        </div>


      </div>
    );
  }
});



export default Home;
