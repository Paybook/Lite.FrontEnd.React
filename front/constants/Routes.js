

const Routes = [
	{title:"Login", component:"Login", type:"public"},
	{title:"Signup", component:"Signup", type:"public"},
	{title:"Home", component:"Home", drawer:true, icon:"mdi mdi-home", type:"public"},	
	{title:"Accounts", component:"Accounts", drawer:true, icon:"mdi mdi-file-document", type:"private"},	
	{title:"Widget", component:"Widget", drawer:true, icon:"mdi mdi-settings-box", type:"private"}	,
]



export default Routes;
