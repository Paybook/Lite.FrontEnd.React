var actions = {}
import store from './store'

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

export default actions;