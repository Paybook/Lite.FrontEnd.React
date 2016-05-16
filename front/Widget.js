/**
 * In this file, we create a React component
 * which incorporates components providedby material-ui.
 */

import React from 'react';
import { connect  } from 'react-redux'
import store from './redux/store'


var Widget = React.createClass({
	componentDidMount: function(){
		pbWidget.setDev();
        ///var data_js = {{data|tojson}}
        //////var data_json = JSON.parse(data_js)
        var data_json = {}
        var token = data_json[this.props.user.token]                    
        pbWidget.setToken(token);
        pbWidget.chooseBank();
	},
	render: function() {
		return (
			<div>
				<h2> Widget </h2>	

				
		                  <div id="paybook-container"></div>


		    </div>			
			
		);
	}
});

const mapStateToProps = function(store) {
  return {
	user: store.userState,
  };
}


export default connect(mapStateToProps)(Widget);