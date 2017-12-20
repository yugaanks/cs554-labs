var Express=require('express');
var bodyParser = require('body-parser');
var app=Express();
let configRoutes = require("./routes");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//middleware 1
app.use('*', (req,res,next)=>{
	console.log("request body: ");
	console.log(req.body);
	console.log("request route: "+ req.baseUrl);
	console.log("HTTP verb: "+ req.method);
	next();
});

//middleware 2
var req_times={};
app.use('*', (req, res, next)=>{
	let req_base_url=req.baseUrl;
	if(req_times[req_base_url]==undefined)
		req_times[req_base_url]=0;
	req_times[req_base_url]++;
	console.log("request times: ");
	console.log(req_times);
	console.log("\n");
	next();
});

configRoutes(app);

app.listen(3000,()=>{
	console.log("Server is running at localhost:3000");
});