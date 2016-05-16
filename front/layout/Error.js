/**
 * In this file, we create a React component
 * which incorporates components providedby material-ui.
 */

import React from 'react';
import { connect  } from 'react-redux'
import store from '../redux/store'


import Snackbar from 'material-ui/Snackbar';



var ErrorComponent = React.createClass({
  handleRequestClose: function(){
    store.dispatch({
      type:"ERROR_DISPLAY",
      message:false,
    })
  },
  render: function() {
    return(
        <div>
           <Snackbar
              open={this.props.error!=false?true:false}
              message={this.props.error}
              autoHideDuration={4000}
              onRequestClose={this.handleRequestClose}
            />
    
        </div>
    )
  }
});

const mapStateToProps = function(store) {
  return {
    error: store.errorState
  };
}


export default connect(mapStateToProps)(ErrorComponent);
//export default Bar;
