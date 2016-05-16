var apicall = {}
var baseURL =  "http://127.0.0.1:5000" 


apicall.getTransactions = function(data, success, error){
	$.ajax({
		url : baseURL+'/transactions?token='+data.token+"&id_account="+data.id_account,	 	
//		data : JSON.stringify(data), 
		type : 'GET',	
//		contentType: "application/json; charset=utf-8",
//		dataType : 'application/json', 
		success : function(response) {
			success(JSON.parse(response))	       
		},
		error : function(errResponse, status) {	      
			error(errResponse)
		},
		complete : function(xhr, status) {}
	});

}

apicall.getAccounts = function(data, success, error){
	var newData = JSON.stringify(data)

	$.ajax({
		url : baseURL+'/accounts?token='+data.token+"&id_site="+data.id_site,	 
		data : newData,	 
		type : 'GET',	 
		//contentType: "application/json; charset=utf-8",
		//dataType : 'application/json',
		success : function(response) {
			success(JSON.parse(response))	       
		},
		error : function(errResponse, status) {	      
			error(errResponse)
		},
		complete : function(xhr, status) {}
	});

}

apicall.catalogues = function(data, success, error){

	$.ajax({
		url : baseURL+'/catalogues',	 
		data : {token: data.token},	 
		type : 'GET',	 
		contentType: "application/json; charset=utf-8",
		success : function(response) {
			success(JSON.parse(response))	       
		},
		error : function(errResponse, status) {	        
			error(errResponse)
		},
		complete : function(xhr, status) {}
	});

}

apicall.checkStatus = function(data, success, error){
	$.ajax({
		url : data,	 	 
		type : 'GET',	 
		success : function(response) {
			console.log(response)
			success(response)	       
		},
		error : function(errResponse, status) {	        
			error(errResponse)
		},
		complete : function(xhr, status) {}
	});

}


apicall.twofaResponse = function(data, success, error){

	var dataToSend = {};
	var twofa = {}
	twofa[data.tokenName]= data.token
	dataToSend.twofa = twofa;
	dataToSend.id_site = data.id_site;
	dataToSend.token = data.tokenUser;

	$.ajax({
		url : baseURL+'/twofa',  //data.address+"?token="+data.tokenUser,	 
		data : JSON.stringify(dataToSend),	 
		type : 'POST',	 
		contentType: "application/json; charset=utf-8",
		success : function(response) {
			success(JSON.parse(response))	       
		},
		error : function(errResponse, status) {	        
			error(errResponse)
		},
		complete : function(xhr, status) {}
	});

}


apicall.credentialsRegister = function(data, success, error){
	var newData = JSON.stringify(data)

	$.ajax({
		url : baseURL+'/credentials',	 
		data : newData,	 
		type : 'POST',	 
		contentType: "application/json; charset=utf-8",
		//dataType : 'application/json',
		success : function(response) {
			success(JSON.parse(response))	       
		},
		error : function(errResponse, status) {	        
			error(errResponse)
		},
		complete : function(xhr, status) {}
	});

}

apicall.credentialsDelete = function(data, success, error){
	var newData = JSON.stringify(data)

	$.ajax({
		url : baseURL+'/credentials',	 
		data : newData,	 
		type : 'DELETE',	 
		contentType: "application/json; charset=utf-8",
		//dataType : 'application/json',
		success : function(response) {
			success(JSON.parse(response))	       
		},
		error : function(errResponse, status) {	      
			error(errResponse)
		},
		complete : function(xhr, status) {}
	});

}

apicall.credentialsRequest = function(data, success, error){
	var newData = JSON.stringify(data)

	$.ajax({
		url : baseURL+'/credentials?token='+data.token,	 
		//data : {token: newData.token},	 
		type : 'GET',	 
		contentType: "application/json; charset=utf-8",
		//dataType : 'application/json',
		success : function(response) {
			success(JSON.parse(response))	       
		},
		error : function(errResponse, status) {	       
			error(errResponse)
		},
		complete : function(xhr, status) {}
	});

}



apicall.userDelete = function(data, success, error){

	$.ajax({
		url : baseURL+'/delete',	 
		data : {username: data.username},	 
		type : 'POST',	 
		contentType: "application/json; charset=utf-8",
		dataType : 'application/json',
		success : function(response) {
			success(response)	       
		},
		error : function(errResponse, status) {	        
			error(errResponse)
		},
		complete : function(xhr, status) {}
	});

}


apicall.login = function(data, success, error){

	$.ajax({
		url : baseURL+'/login',	 
		data : JSON.stringify({username: data.username, password:data.password}),	 
		type : 'POST',	 
		contentType: "application/json; charset=utf-8",
		success : function(response) {
			success(response)	       
		},
		error : function(errResponse, status) {	        
			error(errResponse)
		},
		complete : function(xhr, status) {}
	});

}

apicall.signup = function(data, success, error){

	$.ajax({
		url : baseURL+'/signup',	 
		data : JSON.stringify({username: data.username, password:data.password}),	 
		type : 'POST',	 
		contentType: "application/json; charset=utf-8",
		success : function(response) {
			success(response)	       
		},
		error : function(errResponse, status) {	        
			error(errResponse)
		},
		complete : function(xhr, status) {}
	});

}

export default apicall;