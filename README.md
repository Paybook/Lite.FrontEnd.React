# Lite.Paybook.React

Lite.Paybook.React (LPR) is a frontend boilerplate based on react that people can use to develop a single page application and connect it with paybook, some features of LPR are:

  - Use [weback](https://nodejs.org/)  to manipulate modules modules
  - Material design components by [material-ui](http://www.material-ui.com/#/components)
  - [Redux](https://github.com/reactjs/redux) controller
  - [Bootstraps](https://getbootstrap.com/examples/grid/) grid system

### Install
Get a copy of LPR:
```sh
git clone https://github.com/Paybook/lite-frontend-react.git
```
[NodeJs](https://nodejs.org/en/download/) needed. Install dependencies:
```sh
npm install
```
To run dev enviroment:
```sh
npm start
```
and go to http://localhost:3000

To make api calls for paybook methods, you will need set the url of the server in the file "front/constants/server.js",
or you can install the [lite-python](https://github.com/Paybook/lite-python)

To get the final files for production just type:
```sh
npm run build
```

The output files will be located in the folder "/public"

### Create new page
For example, let's create an "about" page. First in /front create a new file with the name "About.js" (note that all the names in react coponents are in PascalCase).In the file we will put a react component that will display the content of our page.

```sh
//Import react library via webpack
import React from 'react'; 

//Create the component of the page, by convention it has the same name as the file
var About = React.createClass({
  render: function() {
    return (
      <div>
        <h1>About page </h1>        
      </div>
    );
  }
});

//Export the component to make it usable in other js files 
export default About;
```
To make it visible in the menu bar, open the file "/front/constants/Routes.js",  there you can add a new line and add the object for the new page, with the title, the react component that will load, specify if it will appear in the drawer, the icon to show in the menu ([material icons](https://materialdesignicons.com)), and if it's public (is visible to all users) or private (only visible to logged users).
```sh
{title:"About", component:"About", drawer:true, icon:"mdi mdi-information", type:"public"}
```
If you want to modify manually the drawer menu you can do it in the file "/front/layout/DrawerMenu.js"

### Add componentes
The components are provided by [material-ui](www.material-ui.com/#/components/), you can check their website to learn how  to insert each componet and what properties it haves, for examples lets insert a button and two fields in our "about" page.

The first step is to insert get the components from MUI, so in the imports of your file add:
```sh
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
```

In material usually all elements are put inside of the paper component, it is a container, remember that you can use the [Bootstraps](https://getbootstrap.com/examples/grid/) grid system

```sh
<h1>About page </h1> 
<div className="col-md-3"></div> 
<Paper className="col-md-6 text-center">
  content here
</Paper> 
<div className="col-md-3"></div>
```

Now add the fields and the buttons in the paper, note that you can add the styles directly to the components ,you can view more details of the componentes in [material-ui](www.material-ui.com/#/components/):
```
<Paper className="col-md-6 text-center">
      <TextField
        floatingLabelText="username"  
        style={{margin:"10px"}}     
      />
      <br></br>
      <TextField
        floatingLabelText="password"  
        style={{margin:"10px"}}   
      />
      <br></br>
      <div style={{"marginTop":"36px"}}>
        <RaisedButton label="SignUp"  primary/>
      </div>
        </Paper> 
```

### Redux structure
Although you can use any controller to manage the data of your application, we strongly recommend the uses of redux that is already implemented in LPR.  You can check the [excellent tutorial](https://css-tricks.com/learning-react-redux/) of Brad Westfall about redux and react.

In LPR the store of all tha pages is located in the file "front/redux/store.js", there are all the reducer and in the bottom of the file there is the combiner of reducer, you can check for examplo de Login.js and the store.js to check how the data is passed.


### Request API
You can make API petitions from any page, you will need to set the server url in the file "front/constants/server.js", or you can use the [lite-python](https://github.com/Paybook/lite-python). We recommend that you store all your api calls in the file "front/redux/apicall", there are already all the apicalls for paybook methods, for example, lets call the apicall to submit a signup in the about page.

In the about page import the module apicalls
```
import apicall from './redux/apicall'
```

In the About component add the methods:

```
var About = React.createClass({
  getInitialState: function(){
      return({username:"", password:""})
  },
  handleUsernameChange: function(event,value){
    this.setState({username:value})
  },
  handlePasswordChange: function(event,value){
    this.setState({password:value})
  },
  render....
```
And add the prop onChange to the TextFields to handle the changes  and store in the state, also the onClick method to the button:
```
            <TextField
        floatingLabelText="username"  
        style={{margin:"10px"}} 
        onChange={t.handleUsernameChange}   
      />
      <br></br>
      <TextField
        floatingLabelText="password"  
        style={{margin:"10px"}}
        onChange={t.handlePasswordChange}   
      />
      <br></br>
      <div style={{"marginTop":"36px"}}>
        <RaisedButton label="SignUp"  onClick={t.submitSignup}primary/>
      </div>
```
finally add the method to call the signup apicall:
```
  ...handlePasswordChange: function(event,value){
    this.setState({password:value})
  },
  submitSignup:function(){
    actions.loaderOn();
    apicall.signup({username:this.state.username, password:this.state.password},
    function(response){
        actions.loaderOff()
        actions.message("User created successfully");
    },
     function(error){
        actions.loaderOff();
        actions.error(error.responseText)
    });
  },
  render...
```
Now when you click on the signup button you can register a user and login in the page with it, for all the apicalls the first argument is the data to send, the second is a callback function for success and the third, the callback for the error.

### actions
There is a module of various actions to control the flow of yout application. 
```
import actions from './redux/actions'

  actions.loaderOff()             //show the loader
  actions.loaderOn()              //hide the loader
  actions.error("an error")       //display an error to the user
  actions.message("my message")   //display a message to the user
```
## API Request list

You can use the pre-made apicall functions to call any of the [paybook method](https://www.paybook.com/syncdocs#api-Credentials-GetCredentials), just include the apicall file:

```
import apicall from './redux/apicall'
```

Except from signup and login, all the apicalls require the token of the user session that comes in the login response.

### signup
```
var data = {
  username: String,
  password: String
}
apicall.signup(data,success_callback,error_callback)
```

### login
```
var data = {
  username: String,
  password: String
}
apicall.login(data,success_callback,error_callback)
```
returns
```
  {token: String} //The token for this user session
```


### userDelete
```
var data = {
  username: String,
}

apicall.userDelete(data,success_callback,error_callback)
```

### catalogues
```
var data = {
  token: String,
}
apicall.catalogues(data,success_callback,error_callback)
```

### credentialsRegister
```
var data = {
  token: String,
  id_site: String,
  credentials: Object, //This is different for every site, the details comes in the response of catalogues
}
apicall.credentialsRegister(data,success_callback,error_callback)
```
After you register the credentials, you need to manage to response of the websockets that comes in the property "ws" of the response, you can use the socket manager that comes natively in html5:

```
  var credentialSocket = new WebSocket(socket);

  credentialSocket.onmessage = function (event) {
    var data = JSON.parse(event.data);

    var code  = data.code;
    if (code == 100){
      actions.message("Connecting with the bank")
    }
    if (code == 101){
      actions.message("Connecting with the bank")
    }
    if (code == 102){
      actions.message("Connection successful")
      finish();
    }
    if( code == 401){
      actions.message("Invalid credentials");
      errorCredential(data.id_credential)
    }
    .
    .
    .
```
You can check all the response codes [here](https://s3.amazonaws.com/uploads.hipchat.com/32315/216756/V8VANvo40VFYRWV/Sync-Jobstatus-280416-1020-4.pdf)

### credentialsDelete
```
var data = {
  token: String,
  id_credential: String,
}
apicall.credentialsDelete(data,success_callback,error_callback)
```

### credentialsRequest
```
var data = {
  token: String,
}
apicall.credentialsRequest(data,success_callback,error_callback)
```

### twofaResponse
Some sites require an authentication token or captcha to get the transactions, in this case you need to send it, with this apicall

```
var data = {
  token: String,
  twofa: Object, //you get the details for twofa fields, in the message of the socket when the code is 410 in credentialsRegister
  id_site: String, //this comes from catalogues
}
apicall.twofaResponse(data,success_callback,error_callback)
```

### getAccounts
```
var data = {
  token: String,
  id_site: String
}
apicall.getAccounts(data,success_callback,error_callback)
```

### getTransactions
```
var data = {
  token: String,
  id_account: String,
}
apicall.getTransactions(data,success_callback,error_callback)
```