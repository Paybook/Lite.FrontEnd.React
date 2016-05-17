/*

Pending:
- Add the avatar to the credentialsGet
- Make proper validation in signup function


*/
var apikey = "b7e57daf2b782bee22f05e38a1823c3a";
var is_test = true

var request = require('request');
var express    = require('express');  
var bodyParser = require("body-parser");


var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());



var checkCode = function(code){

}

var handleError = function(){

}


var buildError = function(error){
	if(!error.code){	error.code = 500}
	if(!error.message){	error.message = "Server error"}
	return error
}



//                             888888ba                    dP                         dP       
//                             88    `8b                   88                         88       
// aaaaaaaa aaaaaaaa aaaaaaaa a88aaaa8P' .d8888b. dP    dP 88d888b. .d8888b. .d8888b. 88  .dP  
//                             88        88'  `88 88    88 88'  `88 88'  `88 88'  `88 88888"   
// 88888888 88888888 88888888  88        88.  .88 88.  .88 88.  .88 88.  .88 88.  .88 88  `8b. 
//                             dP        `88888P8 `8888P88 88Y8888' `88888P' `88888P' dP   `YP 
//                                                     .88                                     
//                                                 d8888P                                      


var accountsRequest = function(data, successCallback, errorCallback){

	var url = 'https://sync.paybook.com/v1/accounts?token='+data.token
	//+'&api_key='+apikey
	if(data.id_site){	url += '&id_site='+data.id_site}
	console.log(url)
	request({
		url: url,
		method: 'GET',
	},
	function(error, response, body){
		if(error){
			errorCallback(error)
		}
		var resp = JSON.parse(body).response
		console.log(resp)
		successCallback(resp)
	})
}

var cataloguesSites = function(data, successCallback, errorCallback){
	request({
		url: 'https://sync.paybook.com/v1/catalogues/sites?token='+data.token+'&is_test='+is_test,
		method: 'GET',
	},
	function(error, response, body){
		if(error){
			errorCallback(error)
		}
		var resp = JSON.parse(body).response
		successCallback(resp)
	})
}


var credentialsRequest = function(data, successCallback, errorCallback){
	request({
		url: 'https://sync.paybook.com/v1/credentials?token='+data.token+'&api_key='+apikey,
		method: 'GET',
	},
	function(error, response, body){
		if(error){
			errorCallback(error)
		}
		var resp = JSON.parse(body).response
		successCallback(resp)
	})
}

var credentialsRegister = function(data, successCallback, errorCallback){
	
	var newData = {
			token: data.token,
			api_key:apikey,
			"id_site": data.id_site,
			credentials: data.credentials
		}

	url = 'https://sync.paybook.com/v1/credentials' //?token='+data.token+'&api_key='+apikey+'&id_site='+data.id_site+'&credentials='+JSON.stringify(data.credentials)

	request({
		url: url,
		method: 'POST',
		"Content-type":"application/json",
		body: JSON.stringify(newData),
	},
	function(error, response, body){
		if(error){
			errorCallback(error)
		}
		console.log(body)
		var resp = JSON.parse(body).response
		successCallback(resp)
	})
}

var credentialsRemove = function(data, successCallback, errorCallback){
	request({
		url: 'https://sync.paybook.com/v1/credentials/'+data.id_credential+'?token='+data.token+'&api_key='+apikey,
		method: 'DELETE',
	},
	function(error, response, body){
		if(error){
			errorCallback(error)
		}
		var resp = JSON.parse(body).response
		successCallback(resp)
	})
}


var twofaSend = function(data, successCallback, errorCallback){
	

	var newData = {
			token: data.token,
			api_key:apikey,
			id_site: data.id_site,
			twofa: data.twofa
		}

	url = 'https://sync.paybook.com/v1/credentials' //?token='+data.token+'&api_key='+apikey+'&id_site='+data.id_site+'&credentials='+JSON.stringify(data.credentials)

	request({
		url: data.url,
		method: 'POST',
		"Content-type":"application/json",
		body: JSON.stringify(newData),
	},
	function(error, response, body){
		if(error){
			errorCallback(error)
		}
		console.log(body)
		var resp = JSON.parse(body).response
		successCallback(resp)
	})
}


var userCreate = function(data, successCallback, errorCallback){
	var username = data.username;
	var password = data.password;
	request({
		url: 'https://sync.paybook.com/v1/users?_method=post&api_key='+apikey+'&name='+username+'&id_external='+password,
	},
	function(error, response, body){
		if(error){
			errorCallback(error)
		}
		var resp = JSON.parse(body).response
		successCallback()
	})
}

var usersGet = function(data, successCallback, errorCallback){
	request({
		url: 'https://sync.paybook.com/v1/users?_method=get&api_key='+apikey,
	},
	function(error, response, body){
		if(error){
			errorCallback(error)
		}
		successCallback(JSON.parse(body).response)
	})	
}

var userGet = function(data, successCallback, errorCallback){
	request({
		url: 'https://sync.paybook.com/v1/users'+data.token+'/verify',
		method:'GET',
	},
	function(error, response, body){
		if(error){
			errorCallback(error)
		}
		console.log(body)
		successCallback(JSON.parse(body).response)
	})	
}


var sessionCreate = function(data, successCallback, errorCallback){
	request({
		url: 'https://sync.paybook.com/v1/sessions?_method=post&api_key='+apikey+'&id_user='+data.id_user,
	},
	function(error, response, body){
		if(error){
			errorCallback(error)
		}
		successCallback(JSON.parse(body).response)
	})
}

var transactionsRequest = function(data, successCallback, errorCallback){

	var url = 'https://sync.paybook.com/v1/transactions?token='+data.token+'&api_key='+apikey
	if(data.id_account){	url += '&id_account='+data.id_account}

	request({
		url: url,
		method: 'GET',
	},
	function(error, response, body){
		if(error){
			errorCallback(error)
		}
		var resp = JSON.parse(body).response
		successCallback(resp)
	})
}


// userCreate("ej1","ej1")
 /*
var users = usersGet(null,
function(response){
	response.map(function(user){
		console.log(user)
	})
},
function(error){
	console.log(error)
});
*/


/*

                            .d888888   888888ba  dP     88888888b                              dP   oo                            
                           d8'    88   88    `8b 88     88                                     88                                 
aaaaaaaa aaaaaaaa aaaaaaaa 88aaaaa88a a88aaaa8P' 88    a88aaaa    dP    dP 88d888b. .d8888b. d8888P dP .d8888b. 88d888b. .d8888b. 
                           88     88   88        88     88        88    88 88'  `88 88'  `""   88   88 88'  `88 88'  `88 Y8ooooo. 
88888888 88888888 88888888 88     88   88        88     88        88.  .88 88    88 88.  ...   88   88 88.  .88 88    88       88 
                           88     88   dP        dP     dP        `88888P' dP    dP `88888P'   dP   dP `88888P' dP    dP `88888P' 
                                                                                                                                  
*/

var accounts = function(data, success, error){
	accountsRequest(data,
	function(resp){
		success(resp)
	},
	function(err){
		error(err)
	});
}

var catalogues = function(data, success, error){
	cataloguesSites(data,
	function(resp){
		success(resp)
	},
	function(err){
		error(err)
	});
}

var credentialsDelete = function(data, success, error){
	credentialsRemove(data,
	function(resp){
		success(resp)
	},
	function(err){
		error(err)
	});
}

var credentialsGet = function(data, success, error){
	credentialsRequest(data,
	function(resp){
		success(resp)
	},
	function(err){
		error(err)
	});
}

var credentialsPost = function(data, success, error){
	credentialsRegister(data,
	function(resp){
		success(resp)
	},
	function(err){
		error(err)
	});
}

var login = function(data, success, error){
	//Get all the users
	usersGet(null,
	function(res){
		//Check if the user is valid
		var user = null;
		var valid = false;
		res.map(function(us){
			if(data.username == us.name){
				user = us;
			}
		})

		//Chekc the password (we will store as id_external to simplify all)
		if(user.id_external == data.password){
			valid = true
		}

		//get the token for the session if is the info is valid
		if(valid === true && user != null){
			sessionCreate({id_user: user.id_user},
			function(res){
				success(res)
			},
			function(err){
				error(err)
			})
		}
		else{
			error({code:401, message:"Incorrect user or password"})
		}

		
		
	},
	function(err){
		error(err)
	});
}

var signup = function(data, success, error){
	userCreate(data,
	function(resp){
		success(resp)
	},
	function(err){
		error(err)
	});
}

var twofa = function(data, success, error){
	console.log(data)
	twofaSend(data,
	function(resp){
		success(resp)
	},
	function(err){
		error(err)
	});
}

var transactions = function(data, success, error){
	transactionsRequest(data,
	function(resp){
		success(resp)
	},
	function(err){
		error(err)
	});
}


//                             .d888888   888888ba  dP 
//                            d8'    88   88    `8b 88 
// aaaaaaaa aaaaaaaa aaaaaaaa 88aaaaa88a a88aaaa8P' 88 
//                            88     88   88        88 
// 88888888 88888888 88888888 88     88   88        88 
//                            88     88   dP        dP 
    
//Enable CORS                                                
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", 'POST, GET, PUT, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});                                


app.get('/accounts', function (req, res) {
   console.log(".../accounts")
   var data = req.query
   accounts(data, 
   	function(resp){
   		res.send(resp);
   	},
   	function(err){
   		err = buildError(err)
   		res.statusCode = err.code
   		res.send('Error '+err.code+": "+err.message);
   	})

});

app.get('/catalogues', function (req, res) {
   console.log(".../catalogues")
   var data = req.query
   catalogues(data, 
   	function(resp){
   		res.send(resp);
   	},
   	function(err){
   		err = buildError(err)
   		res.statusCode = err.code
   		res.send('Error '+err.code+": "+err.message);
   	})

});

app.get('/credentials', function (req, res) {
   console.log(".../credentials GET")
   var data = req.query
   credentialsGet(data, 
   	function(resp){
   		res.send(resp);
   	},
   	function(err){
   		err = buildError(err)
   		res.statusCode = err.code
   		res.send('Error '+err.code+": "+err.message);
   	})

});

app.post('/credentials', function (req, res) {
   console.log(".../credentials POST")
   var data = req.body;
   credentialsPost(data, 
   	function(resp){
   		res.send(resp);
   	},
   	function(err){
   		err = buildError(err)
   		res.statusCode = err.code
   		res.send('Error '+err.code+": "+err.message);
   	})

});

app.delete('/credentials', function (req, res) {
   console.log(".../credentials POST")
   var data = req.body;
   credentialsDelete(data, 
   	function(resp){
   		res.send(resp);
   	},
   	function(err){
   		err = buildError(err)
   		res.statusCode = err.code
   		res.send('Error '+err.code+": "+err.message);
   	})

});

app.post('/login', function (req, res) {
   console.log(".../login")
   var data = req.body
   login(data, 
   	function(resp){
   		res.send(resp);
   	},
   	function(err){
   		err = buildError(err)
   		res.statusCode = err.code
   		res.send('Error '+err.code+": "+err.message);
   	})

});

app.post('/signup', function (req, res) {
	console.log(".../signup")
   var data = req.body
   signup(data, 
   	function(resp){
   		res.send(resp);
   	},
   	function(err){
   		err = buildError(err)
   		res.statusCode = err.code
   		res.send('Error '+err.code+": "+err.message);
   	})
});

app.get('/transactions', function (req, res) {
   console.log(".../transactions")
   var data = req.query
   transactions(data, 
   	function(resp){
   		res.send(resp);
   	},
   	function(err){
   		err = buildError(err)
   		res.statusCode = err.code
   		res.send('Error '+err.code+": "+err.message);
   	})
});


app.post('/twofa', function (req, res) {
	console.log(".../twofa")
   var data = req.body
   twofa(data, 
   	function(resp){
   		res.send(resp);
   	},
   	function(err){
   		err = buildError(err)
   		res.statusCode = err.code
   		res.send('Error '+err.code+": "+err.message);
   	})
});




app.listen(5000, function () {
  console.log('lIstening on port 5000!');
});

