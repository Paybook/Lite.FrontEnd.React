

const Routes = [
	{title:"Login", component:"Login", type:"public"},
	{title:"Signup", component:"Signup", type:"public"},
	{title:"Accounts", component:"Accounts", drawer:true, icon:"mdi mdi-folder-plus", type:"private"},
	{title:"Transactions", component:"Transactions", drawer:true, icon:"mdi mdi-file-document", type:"private"},	
	{title:"Settings", component:"Settings", drawer:true, icon:"mdi mdi-settings", type:"private"},	
];



export default Routes;
