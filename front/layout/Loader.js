/**
 * In this file, we create a React component
 * which incorporates components providedby material-ui.
 */

import React from 'react';
import { connect  } from 'react-redux'
import store from '../redux/store'


import Snackbar from 'material-ui/Snackbar';
import CircularProgress from 'material-ui/CircularProgress';


var Loader = React.createClass({
  handleRequestClose: function(){
    store.dispatch({
      type:"ERROR_DISPLAY",
      message:false,
    })
  },
  render: function() {
    const style = {
      width:"100%",
      height:"100%",
      top:"0px",
      left:"0px",
      position:"fixed",
      zIndex:"2000",
      background:"#3F3B44",
      opacity:"0.7",
      paddingTop:"150px"
    }
    if (this.props.open == false){
      return null
    }
    else{
      return(

        <div>
          <div style={style} className="text-center">
             <CircularProgress color="white" />
      
          </div>
        </div>
      )
    }
  }
});

const mapStateToProps = function(store) {
  return {
    open: store.loaderState
  };
}

export default connect(mapStateToProps)(Loader);
//export default Bar;
