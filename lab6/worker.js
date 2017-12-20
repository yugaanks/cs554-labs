const redisConnection = require("./redis-connection");

const data = require("./data");
const db = data.db;

redisConnection.on('get-by-id:request:*', async (message, channel)=>{
	let requestId=message.requestId;
	let eventName=message.eventName;
	let person={};
	let id=message.data.message;
	let successEvent=`${eventName}:success:${requestId}`;
	try {
		person=await db.getById(id);
		console.log(person);
	} catch(e) {
		console.log(e);
	}

	redisConnection.emit(successEvent, {requestId: requestId, data: person, eventName: eventName});

});

redisConnection.on('delete:request:*', async (message, channel)=>{
	let requestId=message.requestId;
	let eventName=message.eventName;
	let x;
	let id=message.data.message;
	let successEvent=`${eventName}:success:${requestId}`;
	try {
		//person=await db.getById(id);
		x=await db.delete(id);
		console.log("delete successful");
	} catch(e) {
		x=e;
		console.log(e);
	}

	redisConnection.emit(successEvent, {requestId: requestId, data: {x: x}, eventName: eventName});

});

redisConnection.on('add:request:*', async (message, channel)=>{
	let requestId=message.requestId;
	let eventName=message.eventName;
	let x;
	let body=message.data.message;

	let successEvent=`${eventName}:success:${requestId}`;
	try {
		//person=await db.getById(id);
		//console.log("body? "+body);
		//console.log(body.first_name+" " + body.last_name+" " + body.email+" " + body.gender +" " +body.ip_address);
		x=await db.add(body.first_name, body.last_name, body.email, body.gender, body.ip_address);
		console.log("person added");
	} catch(e) {
		x={};
		console.log(e);
	}

	redisConnection.emit(successEvent, {requestId: requestId, data: {x: x}, eventName: eventName});

});

redisConnection.on('update:request:*', async (message, channel)=>{
	let requestId=message.requestId;
	let eventName=message.eventName;
	let x;
	let body=message.data.message;
	let successEvent=`${eventName}:success:${requestId}`;
	try {
		//person=await db.getById(id);
		x=await db.update(body.id, body.first_name, body.last_name, body.email, body.gender, body.ip_address);
		console.log("person updated");
	} catch(e) {
		x={};
		console.log(e);
	}

	redisConnection.emit(successEvent, {requestId: requestId, data: {x: x}, eventName: eventName});

});