/**
 * In this file, we create a React component
 * which incorporates components providedby material-ui.
 */

import React from 'react';
import { connect  } from 'react-redux'
import store from '../redux/store'


import Snackbar from 'material-ui/Snackbar';



var Message = React.createClass({
  handleRequestClose: function(){
    store.dispatch({
      type:"MESSAGE_DISPLAY",
      message:false,
    })
  },
  render: function() {
    return(
        <div>
           <Snackbar
              open={this.props.message!=false?true:false}
              message={this.props.message}
              autoHideDuration={4000}
              onRequestClose={this.handleRequestClose}
            />
    
        </div>
    )
  }
});

const mapStateToProps = function(store) {
  return {
    message: store.messageState
  };
}


export default connect(mapStateToProps)(Message);
//export default Bar;
