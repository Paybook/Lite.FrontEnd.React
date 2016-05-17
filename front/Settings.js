
import React from 'react';
import { connect  } from 'react-redux'
import store from './redux/store'
import apicall from './redux/apicall'
import actions from './redux/actions'
import styles from './constants/styles.js'

//MUI Componentes
import Toggle from 'material-ui/Toggle';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';



var Settings = React.createClass({
	handleToggle: function(event,state){
		store.dispatch({
			type: 'WIDGET_STATE',
			state: state
		})
	},
	render: function() {
		var t = this;
		return (
			<div>
				<h2> Settings	</h2>
				
				<div className="col-md-3"></div>
				<Paper className="col-md-3" style={{"padding":"26px"}}>
					{
						t.props.widget?
						<Toggle
					      label="Use widget"
					      onToggle={t.handleToggle}
					      defaultToggled ={true}
					    />:
					    <Toggle
					      label="Use widget"
					      onToggle={t.handleToggle}
					      defaultToggled ={false}
					    />

					}
					
				</Paper>
				<div className="col-md-3"></div>
								
			</div>
		);
	}
});


const mapStateToProps = function(store) {
  return {
	username: store.userState,
	widget: store.widgetState,
  };
}


export default connect(mapStateToProps)(Settings);