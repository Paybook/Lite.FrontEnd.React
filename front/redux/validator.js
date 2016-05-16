

function validator(type, val, required){
	if(required === true){
		if(typeof val === "string" && val === ""){
			return "The field is required"
		}		
		else if(typeof val === "object" && val.val1 === ""){
			return "The field is required"
		}
	}
	if(type === "email"){
		let emailRE = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    	let test = emailRE.test(val);
		if(test === false){
			return "Invalid email"
		}
	}
	if(type === "username"){
		if(val.length < 6){
			return "The minimum length is 6"
		}
	}
	if(type === "password"){
		if(val.length < 6){
			return "The minimum length of password is 6"
		}
	}
	if(type === "passwordRepeat"){
		if(val.val1 !=  val.val2){
			return "The two password fields must match"
		}
	}
	if(type === "validate"){
		for(let prop in val){
			if(val[prop] != ""){
				return false
			}
		}
		return true
	}

	return ""
	


}




export default validator;
