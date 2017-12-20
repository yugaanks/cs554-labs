var path=require('path');
const constructorMethod = (app) => {
  app.get("/", (req,res)=>{
	// res.sendFile(path.resolve(__dirname + "/../public/index.html"));
	res.sendFile('index.html', {root: './public'})
	});
	app.get("*", (req,res)=>{
		res.sendStatus(404);
	});
};

module.exports = constructorMethod;
