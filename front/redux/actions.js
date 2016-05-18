var actions = {}
import store from './store'
import apicall from './apicall'
import cookie from './cookie'



actions.test = function(){
	console.log("TEST")
	console.log(store.getState())
}

actions.error = function(message){
	store.dispatch({
		type:"ERROR_DISPLAY",
		message:message,
	})
}

actions.message = function(message){
	store.dispatch({
		type:"MESSAGE_DISPLAY",
		message:message,
	})
}

actions.loaderOn = function(){
	store.dispatch({
		type:"LOADER_DISPLAY",
	})
}

actions.loaderOff = function(){
	store.dispatch({
		type:"LOADER_HIDE",
	})
}

actions.pageLoad = function(page){
	store.dispatch({
		type:"PAGE_LOAD",
		page:page,
	})
}

actions.getTransactions = function(id_account){
		const s = store.getState()
		var id_account = s.accountsState.currentAccount;
		
		var data = {
			token: s.userState.token,
		}
		if(s.accountsState.currentAccount !=  null){
			data.id_account = s.accountsState.currentAccount
		}

		actions.loaderOn();


		apicall.getTransactions(data,
			function(response){
				store.dispatch({
					type:'TRANSACTIONS_ADD',
					transactions: response,
				})
				actions.loaderOff()
			}, 
			function(error){
				actions.loaderOff()
				actions.error(error)
		})

}

actions.getCredentials = function(){
	const s = store.getState()
	var data = {
		token: s.userState.token,
	}
	actions.loaderOn();


	apicall.credentialsRequest(data,
		function(response){
			store.dispatch({
				type:"SITES_GET",
				sites:response
			})
			actions.loaderOff()
		}, 
		function(error){
			actions.loaderOff()
			error(error)

	})
}

actions.getAccounts = function(id_site){
	const s = store.getState()
	var data = {
		token: s.userState.token,
		id_site: id_site?id_site:null,
	}
	actions.loaderOn();


	apicall.getAccounts(data,
		function(response){
			actions.loaderOff()
			store.dispatch({
				type:'ACCOUNTS_SELECTED',
				accounts: response,
				id_site: data.id_site,
			})
			
		}, 
		function(error){
			actions.loaderOff()
			error(error)

	})
}

actions.setAccount = function(id_account){

	if(!id_account){
		id_account = null
	}

	store.dispatch({
		type:'ACCOUNT_SET',
		account: id_account,
	})
	
}

actions.sessionRefresh = function(){
	
}

actions.logout = function(){
	store.dispatch({
      type:"USER_LOGOUT"
    })
    actions.pageLoad("Login")
	cookie.remove("state")
}

export default actions;