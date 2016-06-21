var apicall = {};

import server from '../constants/server';
import dummyData from './dummyData.js';
import store from './store.js';
import actions from './actions.js';

var baseURL =  server.url;

var handleResponse = function(res){

	if(typeof res != "object" && !Array.isArray(res)){ 
		res = JSON.parse(res);
	}

	if(res.code == 401 && res.response === null && res.status === false){
		actions.error("Invalid session");
		actions.logout();
	}
	else{
		return res;
	}
	
	
};

var handleError = function(error){
	console.log(error);
};

apicall.getTransactions = function(data, success, error){

	var url = "/transactions?token="+data.token;
	if(data.id_account){
		url += "&id_account="+data.id_account;
	}

	$.ajax({ 
		url : baseURL+url, 	
		data : JSON.stringify(data), 
		type : 'GET',	
		contentType: "application/json; charset=utf-8",
//		dataType : 'application/json', 
		success : function(response) {


			success(handleResponse(response));
		},
		error : function(errResponse, status) {	      
			error(errResponse);
		},
		complete : function(xhr, status) {}
	});

};

apicall.getAccounts = function(data, success, error){
	var newData = JSON.stringify(data);
	var url = '/accounts?token='+data.token;
	if(data.id_site !== null && data.id_site !== undefined){
		url += "&id_site="+data.id_site;
	}

	$.ajax({
		url : baseURL+url,	 
		//data : newData,	 
		type : 'GET',	 
		//contentType: "application/json; charset=utf-8",
		//dataType : 'application/json',
		success : function(response) {
			success(handleResponse(response));
		},
		error : function(errResponse, status) {	      
			error(errResponse);
		},
		complete : function(xhr, status) {}
	});

};

apicall.catalogues = function(data, success, error){
 	var test = store.getState().enviromentState;
 	var url = baseURL+'/catalogues?token='+data.token;
 	if(test === true){
 		url += '&is_test=true';
 	}
	$.ajax({
		url : url,	 
		//data : {token: data.token, is_test: test},	 
		type : 'GET',	 
		contentType: "application/json; charset=utf-8",
		success : function(response) {
			success(handleResponse(response));      
		},
		error : function(errResponse, status) {	        
			error(errResponse);
		},
		complete : function(xhr, status) {}
	});

};

apicall.checkStatus = function(data, success, error){
	$.ajax({
		url : data,	 	 
		type : 'GET',	 
		success : function(response) {
			success(handleResponse(response));      
		},
		error : function(errResponse, status) {	        
			error(errResponse);
		},
		complete : function(xhr, status) {}
	});

};


apicall.twofaResponse = function(data, success, error){

	var dataToSend = {};
	
	dataToSend.twofa_key = data.tokenName;
	dataToSend.token = data.tokenUser;
	dataToSend.twofa =  data.address;
	dataToSend.twofa_value = data.token;
	dataToSend.id_credential = data.id_credential;
	
	$.ajax({
		url : baseURL+'/twofa',  //data.address+"?token="+data.tokenUser,	 
		data : JSON.stringify(dataToSend),	 
		type : 'POST',	 
		contentType: "application/json; charset=utf-8",
		success : function(response) {
			success(handleResponse(response));
		},
		error : function(errResponse, status) {	        
			error(errResponse);
		},
		complete : function(xhr, status) {}
	});
	

};


apicall.credentialsRegister = function(data, success, error){
	var newData = JSON.stringify(data);

	$.ajax({
		url : baseURL+'/credentials',	 
		data : newData,	 
		type : 'POST',	 
		contentType: "application/json; charset=utf-8",
		//dataType : 'application/json',
		success : function(response) {
			success(handleResponse(response));
		},
		error : function(errResponse, status) {	        
			error(errResponse);
		},
		complete : function(xhr, status) {}
	});

};

apicall.credentialsDelete = function(data, success, error){
	var newData = JSON.stringify(data);

	$.ajax({
		url : baseURL+'/credentials',	 
		data : newData,	 
		type : 'DELETE',	 
		contentType: "application/json; charset=utf-8",
		//dataType : 'application/json',
		success : function(response) {
			success(handleResponse(response));      
		},
		error : function(errResponse, status) {	      
			error(errResponse);
		},
		complete : function(xhr, status) {}
	});

};

apicall.credentialsRequest = function(data, success, error){
	var newData = JSON.stringify(data);

	//success(dummyData.credentials)
	//return

	$.ajax({
		url : baseURL+'/credentials?token='+data.token,	 
		//data : {token: newData.token},	 
		type : 'GET',	 
		contentType: "application/json; charset=utf-8",
		//dataType : 'application/json',
		success : function(response) {
			success(handleResponse(response));
		},
		error : function(errResponse, status) {	       
			error(errResponse);
		},
		complete : function(xhr, status) {}
	});

};



apicall.userDelete = function(data, success, error){

	$.ajax({
		url : baseURL+'/delete',	 
		data : {username: data.username},	 
		type : 'POST',	 
		contentType: "application/json; charset=utf-8",
		dataType : 'application/json',
		success : function(response) {
			success(handleResponse(response));
		},
		error : function(errResponse, status) {	        
			error(errResponse);
		},
		complete : function(xhr, status) {}
	});

};


apicall.login = function(data, success, error){

	$.ajax({
		url : baseURL+'/login',	 
		data : JSON.stringify({username: data.username, password:data.password}),	 
		type : 'POST',	 
		contentType: "application/json; charset=utf-8",
		success : function(response) {
			success(handleResponse(response));
		},
		error : function(errResponse, status) {	        
			error(errResponse);
		},
		complete : function(xhr, status) {}
	});

};

apicall.signup = function(data, success, error){

	$.ajax({
		url : baseURL+'/signup',	 
		data : JSON.stringify({username: data.username, password:data.password}),	 
		type : 'POST',	 
		contentType: "application/json; charset=utf-8",
		success : function(response) {
			success(handleResponse(response));      
		},
		error : function(errResponse, status) {	        
			error(errResponse);
		},
		complete : function(xhr, status) {}
	});

};

export default apicall;