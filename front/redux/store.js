import { createStore, combineReducers  } from 'redux'
import validator from './validator.js'



// User Reducer
const userInitialState = {
	username:false,
	token: false,
};

const userReducer = function(state = userInitialState, action) {
    if (state === undefined || action.type === 'USER_LOGOUT' ) {
		return Object.assign({}, state, userInitialState)
	}
	if (action.type === 'USER_AUTH') {
	    return Object.assign({}, state, {username:action.username, token: action.token})
	}
	return state;
}

// Widget Reducer
const widgetReducer = function(state = true, action) {
    if (state === undefined ) {
		return true
	}
	if (action.type === 'WIDGET_STATE') {
	     state = action.state;
	}
	return state;
}


// Page Reducer
const pageReducer = function(state = "Home", action) {
	if (state === undefined) {
		state = "Home";
	}
	if (action.type === 'PAGE_LOAD') {
	    state = action.page;
	}
	return state;
}

// Error Reducer
const errorReducer = function(state = false, action) {
	if (state === undefined) {
		state = false;
	}
	if (action.type === 'ERROR_DISPLAY') {
	    state = action.message
	}
	return state;
}

// Message Reducer
const messageReducer = function(state = false, action) {
	if (state === undefined) {
		state = false;
	}
	if (action.type === 'MESSAGE_DISPLAY') {
	    state = action.message
	}
	return state;
}

// Drawer Reducer
const drawerReducer = function(state = true, action) {
	if (state === undefined) {
		state = true;
	}
	if (action.type === 'DRAWER_TOGGLE') {
	    state = !state
	}
	return state;
}

// Error Reducer
const loaderReducer = function(state = false, action) {
	if (state === undefined) {
		state = false;
	}
	if (action.type === 'LOADER_DISPLAY') {
	    state = true
	}
	else if (action.type === 'LOADER_HIDE') {	
	    state = false
	}
	return state;
}

// Signup Reducer
const initialSignupState = {
	username:"",
	password:"",
	passwordRepeat:"",
	errors:{
		username:"",
		password:"",
		passwordRepeat:"",
	},
	valid:false,
};

const signupReducer = function(state = initialSignupState, action) {
	if (state === undefined || action.type === 'SIGNUP_RESET') {
		return Object.assign({}, state, initialSignupState)
	}
	else if (action.type === 'SIGNUP_USERNAME') {
	    return Object.assign({}, state,{"username":action.value})
	}
	else if (action.type === 'SIGNUP_PASSWORD') {
	    return Object.assign({}, state,{"password":action.value})
	}
	else if (action.type === 'SIGNUP_PASSWORDREPEAT') {
	    return Object.assign({}, state,{"passwordRepeat":action.value})
	}
	//FIELDS VALIDATION
	else if (action.type === 'SIGNUP_SUBMIT') {
		let errors = {} 
	    errors.username = validator('username',state.username, true);
	    errors.password = validator('password',state.password, true);
	    errors.passwordRepeat = validator('passwordRepeat',{val1:state.passwordRepeat, val2:state.password}, true);	   
	    let valid = validator('validate', errors) 
	    return Object.assign({}, state,{errors:errors, valid: valid})
	}

	return state;
}


// Login Reducer
const initialLoginState = {
	username:"",
	password:"",
	errors:{
		username:"",
		password:"",
	},
	valid:false,
};

const loginReducer = function(state = initialLoginState, action) {

	if (state === undefined || action.type === 'LOGIN_RESET') {
		return Object.assign({}, state, initialLoginState)
	}
	else if (action.type === 'LOGIN_USERNAME') {
	    return Object.assign({}, state,{"username":action.value})
	}
	else if (action.type === 'LOGIN_PASSWORD') {
	    return Object.assign({}, state,{"password":action.value})
	}
	//FIELDS VALIDATION
	else if (action.type === 'LOGIN_SUBMIT') {
		let errors = {} 
	    errors.username = validator('username',state.username, true);
	    errors.password = validator('password',state.password, true);	   
	    let valid = validator('validate', errors) 
	    return Object.assign({}, state,{errors:errors, valid: valid})
	}

	return state;
}




//Reducer to get accounts
const accountsInitialState = {
	accounts: [],
	accountsSelected:[],
	catalogues:[],
	cataloguesStatus:[],
	newSiteName: null,
	newSiteId:null,
	newSiteCredentials:[],
	sites:[],
	twofa: false,
	twofaToken: false,	
	transactions: [],
	currentAccount: null, 
}
const accountsReducer = function(state = accountsInitialState, action) {

	if (state === undefined ) {
		return Object.assign({}, state, accountsInitialState)
	}
	else if(action.type === "ACCOUNT_SET"){
		return Object.assign({}, state,{currentAccount: action.account});
	}
	else if(action.type === "ACCOUNTS_SELECTED"){
		var newArray = action.accounts.slice(0);
		newArray.map(function(cat, i){
			cat.text = cat.name;
			cat.value = cat.name;
		})
		return Object.assign({}, state,{accountsSelected: newArray});
	}
	else if(action.type === "TRANSACTIONS_ADD"){
		const accounts = state.accountsSelected;
		var accountsById = {}
		accounts.map(function(acc){
			accountsById[acc.id_account] = Object.assign({}, acc,{});
		})

		var newArray = action.transactions.slice(0);
		newArray.map(function(tran){
			tran.accountName = accountsById[tran.id_account].name
		})
		return Object.assign({}, state,{transactions: newArray});
	}
	else if(action.type === "ACCOUNTS_ADD"){
		var newArray = state.accounts.slice(0);
		newArray[action.index] = (action.accounts)
		return Object.assign({}, state,{accounts: newArray});
	}
	else if(action.type === "SITE_ADD"){ 
		return Object.assign({}, state, {
			newSiteName: action.name,
			newSiteId: action.id_site,
			newSiteCredentials: action.credentials,
		})
	}
	else if (action.type == "SITE_CLEAR"){
		return Object.assign({}, state, {
			"newSiteName": null,
			"newSiteCredentials": [],
			"newSiteId":null,
		})
	}
	else if(action.type == "SITES_GET") {
		var newSites = action.sites.slice(0);
		newSites.map(function(site, i){
			site.status = 0	//Add 0 status "Getting status"
		})
		return Object.assign({}, state,{"sites":newSites})
	}
	else if (action.type === 'CATALOGUES_ADD') {
		var newCatalogs = action.catalogues.slice(0);
		newCatalogs.map(function(cat, i){
			cat.text = cat.name;
			cat.value = cat.name;
		})
		return Object.assign({}, state,{"catalogues":newCatalogs})  
	}
	else if (action.type === 'CATALOGUES_STATUS') {
		var newCatalogs = action.cataloguesStatus.slice(0);
	    return Object.assign({}, state,{"cataloguesStatus":newCatalogs})
	}
	else if(action.type == "TWOFA_SET") {
		console.log("===TWOFa SET")
		console.log(action.twofa)
		return Object.assign({}, state,{"twofa":action.twofa})
	}
	else if(action.type == "TWOFA_CLEAR") {
		return Object.assign({}, state,{"twofa":false})
	}


	return state;
}







// Combine the Reducers
const reducers = combineReducers({
  userState: userReducer,
  pageState: pageReducer,
  signupState: signupReducer,
  errorState: errorReducer,
  messageState: messageReducer,
  loaderState: loaderReducer,
  loginState: loginReducer,
  drawerState: drawerReducer,
  accountsState: accountsReducer,
  widgetState: widgetReducer,
});


// Create a store by passing in the reducer
const store = createStore(reducers);



export default store