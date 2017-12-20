var app = require('express')();
const express = require("express");
const http = require('http').Server(app);
const io = require('socket.io')(http);
const chat = io.of('/chat');

const redisConnection = require("./redis-connection");
const nrpSender = require("./nrp-sender-shim");
var path = require('path');
const redis = require('redis');
const client = redis.createClient();
const usersToSocket = {};
app.use(express.static(__dirname));

//configRoutes(app);
app.get("/" , (req, res)=>{
    res.sendFile(__dirname + '/index.html')
});

chat.on('connection', (socket) => {

	//console.log("client connected");
	socket.emit("request-credentials");
  
	socket.on("join-room", (data) => {
		//console.log("room connected");	
		socket.leave(data.previousRoom);
		socket.join(data.newRoom);

		socket.emit("joined-room", data.newRoom);
	});

	socket.on("direct message", (msg) => {
		usersToSocket[msg.userName].emit('private message', {
	  		from: msg.fromUserName,
	  		text: msg.text
		});
	});

	socket.on("setup", (connectionInfo) => {
		usersToSocket[connectionInfo.nickname] = socket;
	});

	socket.on("send-message",async (msg) => {
		//console.log("socket on send message>");
		var response;
		try {
	        response = await nrpSender.sendMessage({
		        redis: redisConnection,
		        eventName: "search-pic",
		        data: {
		            name: msg.name,
		            key: msg.key,
		            message: msg.message
		        }
	   	 	});
		} catch (e) {
	   		 console.log(e);
	 		 response = {};
		}

	   chat.to(msg.room).emit("receive-message", response);
	});

  
});

http.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});