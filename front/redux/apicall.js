/*jshint esversion: 6 */
var apicall = {};

import server from '../constants/server';
import dummyData from './dummyData.js';
import store from './store.js';
import actions from './actions.js';

var baseURL =  "https://private-anon-94e154171b-orauth.apiary-mock.com";

var handleResponse = function(res){
	if(typeof res != "object" && !Array.isArray(res)){ 
		res = JSON.parse(res);

	}

	if(res.code == 401 && res.response === null && res.status === false){
		actions.error("Invalid session");
		actions.logout();
	}
	else{
		console.log(res);
		return res;
	}
	
	
};

var handleError = function(error){
	console.log("===APiCALL ERROR");
	console.log(error);
	actions.error(error);
	if(error.status === 401){
		actions.logout();
	}
	return error;
};









//APICALLS  ORAUTH
apicall.addDocument = function(data, success, error){
	var type = "1";
	console.log(data);
	var dataToSend = data;
	console.log(dataToSend);
	$.ajax({
		url : baseURL+'/v1/documents/user',	 
		data : JSON.stringify(dataToSend),	 
		type : 'POST',	 
		contentType: "application/json; charset=utf-8",
		success : function(response) {
			success(handleResponse(response));
		},
		error : function(errResponse, status) {	        
			error(handleError(errResponse));
		},
		complete : function(xhr, status) {}
	});
};

apicall.signup = function(data, success, error){
	var type = "1";
	if(data.type) {
		type = "2";
	}
	var dataToSend = {username: data.username, password:data.password, type:type};
	console.log(dataToSend);
	$.ajax({
		url : baseURL+'/v1/users',	 
		data : JSON.stringify(dataToSend),	 
		type : 'POST',	 
		contentType: "application/json; charset=utf-8",
		success : function(response) {
			success(handleResponse(response));
		},
		error : function(errResponse, status) {	        
			error(handleError(errResponse));
		},
		complete : function(xhr, status) {}
	});
};

apicall.login = function(data, success, error){
	var dataToSend = {username: data.username, password:data.password}
	console.log(dataToSend);
	$.ajax({
		url : baseURL+'/v1/sessions',	 
		data : JSON.stringify(),	 
		type : 'POST',	 
		contentType: "application/json; charset=utf-8",
		success : function(response) {
			success(handleResponse(response));
		},
		error : function(errResponse, status) {	        
			error(handleError(errResponse));
		},
		complete : function(xhr, status) {}
	});

};

apicall.logout = function(data, success, error){

	$.ajax({
		url : baseURL+'/v1/sessions',	 
		data : JSON.stringify({token: data.token}),	 
		type : 'DELETE',	 
		contentType: "application/json; charset=utf-8",
		success : function(response) {
			success(handleResponse(response));
		},
		error : function(errResponse, status) {	        
			error(handleError(errResponse));
		},
		complete : function(xhr, status) {}
	});

};








/*



apicall.getTransactions = function(data, success, error){

	var url = "/transactions?token="+data.token;
	if(data.id_account){
		url += "&id_account="+data.id_account;
	}
	var storeTransactions = store.getState().accountsState;
	url += "&limit="+storeTransactions.transactionsLimit;
	url += "&skip="+storeTransactions.transactionsSkip;
	console.log(url);
	$.ajax({ 
		url : baseURL+url, 	
		//data : JSON.stringify(data), 
		type : 'GET',	
		contentType: "application/json; charset=utf-8",
//		dataType : 'application/json', 
		success : function(response) {


			success(handleResponse(response));
		},
		error : function(errResponse, status) {	      
			error(handleError(errResponse));
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
			error(handleError(errResponse));
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
			error(handleError(errResponse));
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
			error(handleError(errResponse));
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
			error(handleError(errResponse));
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
			error(handleError(errResponse));
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
			error(handleError(errResponse));
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
			error(handleError(errResponse));
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
			error(handleError(errResponse));
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
			error(handleError(errResponse));
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
			error(handleError(errResponse));
		},
		complete : function(xhr, status) {}
	});

};

*/
export default apicall;