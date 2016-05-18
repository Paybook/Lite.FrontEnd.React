import store from './store'
import cookie from './cookie'
import actions from './actions'

var middleware = function({ getState }){
 return (next) => (action) => {

    // Call the next dispatch method in the middleware chain.
    let returnValue = next(action)

    //Middleware
    var state = getState()
    //console.log(cookie.load("state"))
    cookie.save("state",state)
    console.log(cookie.load("state"))


    return returnValue
  }
}


export default middleware;