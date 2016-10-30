
import React from 'react';
import { connect  } from 'react-redux';
import store from './redux/store';
import apicall from './redux/apicall';
import actions from './redux/actions';
import styles from './constants/styles.js';

//MUI Componentes
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

var width = 320;
var height = 0;
var video        = document.querySelector('#video');
var canvas       = document.querySelector('#canvas');
var photo        = document.querySelector('#photo');

var RegisterPhoto = React.createClass({
	getInitialState() {
		actions.loaderOff();
	    return {photo: false}
	},
	componentDidMount: function(){
		console.log("DID MOUNT");
		var streaming = false,
      	video        = document.querySelector('#video');
      	canvas       = document.querySelector('#canvas');
      	photo        = document.querySelector('#photo');
      	//startbutton  = document.querySelector('#startbutton'),
      	width = 320,
      	height = 0;

  		navigator.getMedia = ( navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia ||
                         navigator.msGetUserMedia);

		navigator.getMedia(
		    {
		      video: true,
		      audio: false
		    },
		    function(stream) {
		      if (navigator.mozGetUserMedia) {
		        video.mozSrcObject = stream;
		      } else {
		        var vendorURL = window.URL || window.webkitURL;
		        video.src = vendorURL.createObjectURL(stream);
		      }
		      video.play();
		    },
		    function(err) {
		      console.log("An error occured! " + err);
		    }
		  );

		video.addEventListener('canplay', function(ev){
		    if (!streaming) {
		      height = video.videoHeight / (video.videoWidth/width);
		      video.setAttribute('width', width);
		      video.setAttribute('height', height);
		      canvas.setAttribute('width', width);
		      canvas.setAttribute('height', height);
		      streaming = true;
		    }
		}, false);
	},
	takePhoto: function(){
		console.log("TAKE PHOTO")
		video        = document.querySelector('#video');
      	canvas       = document.querySelector('#canvas');
      	photo        = document.querySelector('#photo');
		canvas.width = width;
	    canvas.height = height;
	    canvas.getContext('2d').drawImage(video, 0, 0, width, height);
	    var data = canvas.toDataURL('image/png');
	    console.log(data);
	    this.setState({photo: data})
	    //photo.setAttribute('src', data);
	},
	componentWillUnmount: function(){
		var MediaStream = window.MediaStream;

		if (typeof MediaStream === 'undefined' && typeof webkitMediaStream !== 'undefined') {
		    MediaStream = webkitMediaStream;
		}

		/*global MediaStream:true */
		if (typeof MediaStream !== 'undefined' && !('stop' in MediaStream.prototype)) {
		    MediaStream.prototype.stop = function() {
		        this.getAudioTracks().forEach(function(track) {
		            track.stop();
		        });

		        this.getVideoTracks().forEach(function(track) {
		            track.stop();
		        });
		    };
		}
	},
	sendPhoto: function() {
		let s = store.getState().userState
		let photo = this.state.photo;

		if(!photo) {
			actions.error("Captura una foto primero");
			return;	
		}

			
		actions.loaderOn();
		var data = {
			token: s.token,
			base64: this.state.photo,
			type: 1,
		}
		console.log(data);
		apicall.addDocument({username:s.username, password:s.password},
		function(response){
			actions.loaderOff();
			actions.message("Foto agregada exitosamente");

		},
		function(error){
			console.log(error)
			actions.loaderOff();
			actions.error(error.responseText)
		});

	},
	render: function() {
		return (
			<div>
				<h2> Registra foto	</h2>
				<div className="col-md-1" ></div>
				<div className="col-md-10 text-center" onKeyDown={this.handleKey}>
					<div style={{"marginBottom":"24px"}}>
						<RaisedButton label="Tomar foto" style={styles.raisedButton} onClick={this.takePhoto} primary/>
						<RaisedButton label="Enviar foto" style={styles.raisedButton} onClick={this.sendPhoto} primary/>
					</div>
					<video id="video"></video>
					
					<canvas id="canvas"></canvas>
				

					<br></br>
					
					
				</div>
				<div className="col-md-3"></div>	
								
			</div>
		);
	}
});


const mapStateToProps = function(store) {
  return {
	username: store.userState.username,
	token: store.userState.token,
	type: store.userState.type,
  };
}


export default connect(mapStateToProps)(RegisterPhoto);