const route = require("./route");

const constructorMethod = (app) => {
    app.use("/", route);
    app.get("*", (req, res)=>{
    	res.status(404).json({error: "route not found"});
    })
};

module.exports = constructorMethod;