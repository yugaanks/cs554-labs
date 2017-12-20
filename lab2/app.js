var express=require('express');
var app=express();

app.use(express.static("public"));

app.get("/", (req,res)=>{
	res.sendFile(__dirname + "/public/home.html");
});
app.get("*", (req,res)=>{
	res.sendStatus(404);
});

app.listen(3000, ()=>{
	console.log("Server running on localhost:3000");
});