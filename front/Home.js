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
        <Paper style={styles.paper} className="col-md-8">
          <h2>Lite.React Features</h2>

            <li><a href="http://www.material-ui.com/">Material UI</a> components based in material design </li>
            <li><a href="https://webpack.github.io/">Webpack </a> composition system</li>
            <li><a href="https://github.com/reactjs/redux">Redux </a> controller</li>
            <li><a href="http://getbootstrap.com/css/#grid">Bootstraps </a> grid system for responsiveness</li>

        </Paper>
        <div className="col-md-2"></div>
        </div>


        <div className="col-md-12" style={{marginTop:"24px"}}>
        <div className="col-md-2"></div>
        <Paper style={styles.paper} className="col-md-8">
          <h2>Install instructions</h2>

            <li> Install dependencies "npm install" </li>
            <li> Start the development server: "npm start"</li>
            <li> URL of the server: "http://127.0.0.1:3000"</li>
            <br></br>
            <li>To build production files: "npm run build" </li>
            <li>The files will be stored in /public</li>

        </Paper>
        <div className="col-md-2"></div>
        </div>
        
      </div>
    );
  }
});



export default Home;
