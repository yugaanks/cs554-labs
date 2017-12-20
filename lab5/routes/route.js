const express = require('express');
const router = express.Router();
const data = require("../data");
const db = data.db;
const bluebird = require("bluebird");
const flat = require("flat");
const unflatten = flat.unflatten
const redis = require('redis');
const client = redis.createClient();
const redisConnection = require("./redis-connection");

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

router.get("/api/people/history", async (req, res)=>{
	let people=[];
	var length = await client.llenAsync('list');
	if(length>=19){
		length=19;
	}
	people=await client.lrangeAsync('list', 0, length);
	for(let i=0; i<people.length; i++) {
		people[i]=JSON.parse(people[i]);
	}
	res.status(200).json(people);
});

router.get("/api/people/:id" , async (req, res)=>{
	let id = await client.existsAsync(req.params.id);
	if(id){
        let people = await client.getAsync(req.params.id);
        await client.lpush('list', people);
        res.status(200).json(JSON.parse(people));
    } else {
    	try {
    		let people = await db.getById(req.params.id);
    		let result= await client.setAsync(req.params.id, JSON.stringify(people));
    		await client.lpush('list', JSON.stringify(people));
    		res.status(200).json(people);
    	}catch(error) {
    		res.status(404).json({error: "id not found"});
    	}
    }
});

module.exports = router;