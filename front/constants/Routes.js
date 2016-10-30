

const Routes = [
	{title:"Main", component:"Main", type:"public"},
	{title:"Login", component:"Login", type:"public"},
	{title:"Signup", component:"Signup", type:"public"},

	{title:"RegisterPin", component:"RegisterPin", type:"private"},
	{title:"RegisterPhoto", component:"RegisterPhoto", type:"private"},
	{title:"RegisterDocument", component:"RegisterDocument", type:"private"},

	{title:"AuthPin", component:"AuthPin", type:"private"},
	{title:"AuthPhoto", component:"AuthPhoto", type:"private"},	

	{title:"Accounts", component:"Accounts", drawer:true, icon:"mdi mdi-folder-plus", type:"private"},
	{title:"Transactions", component:"Transactions", drawer:true, icon:"mdi mdi-file-document", type:"private"},	
	{title:"Settings", component:"Settings", drawer:true, icon:"mdi mdi-settings", type:"private"},	
];



export default Routes;
