var bodyParser = require('body-parser')
const express = require("express");
let app = express();

let configRoutes = require("./route");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});