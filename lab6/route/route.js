const express = require('express');
const app=express();
const redisConnection = require("../redis-connection");
const nrpSender = require("../nrp-sender-shim");
const router = express.Router();
//const data = require("../data");
//const db = data.db;
//const bluebird = require("bluebird");
//const flat = require("flat");
//const unflatten = flat.unflatten
//const redis = require('redis');
//const client = redis.createClient();


/*bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);*/

router.get("/api/people/:id" , async (req, res)=>{
    try {
		/*let people = await db.getById(req.params.id);
		let result= await client.setAsync(req.params.id, JSON.stringify(people));
		await client.lpush('list', JSON.stringify(people));*/
        let response= await nrpSender.sendMessage({
            redis: redisConnection,
            eventName: "get-by-id",
            data: {
                message: req.params.id
            }
        })
		res.status(200).json(response);
	}catch(e) {
		res.status(404).json({error: "id not found"});
	}
    
});

router.delete("/api/people/:id", async (req, res)=>{
    try {
        /*let person=await db.delete(req.params.id);
        let result= await client.deleteAsync(req.params.id);
        res.json({message: 'delete successful'});*/
        let response= await nrpSender.sendMessage({
            redis: redisConnection,
            eventName: "delete",
            data: {
                message: req.params.id
            }
        });
    } catch(error) {
        res.json({error: 'delete unsuccessful'});
    }
});

router.post("/api/people", async (req, res)=>{
    try {
        if(!(req.body.first_name || req.body.last_name || req.body.email || req.body.gender
                        || req.body.ip_address))
            res.status(400).json("invalid input data");
           //console.log(req.body);
        let response= await nrpSender.sendMessage({
            redis: redisConnection,
            eventName: "add",
            data: {
                message: req.body
            }
        });
        res.json(response);
    } catch(error) {
        res.json({error: 'post unsuccessful'});
    }
});

router.put("/api/people/:id", async(req, res)=>{
    try {
        if(!(req.body.first_name || req.body.last_name || req.body.email || req.body.gender
                        || req.body.ip_address))
            res.status(400).json("invalid input data");
        let xd={"id": req.params.id, "first_name": req.body.first_name, "last_name": req.body.last_name, "email": req.body.email, "gender": req.body.gender,
                    "ip_address": req.body.ip_address};
        let response= await nrpSender.sendMessage({
            redis: redisConnection,
            eventName: "update",
            data: {
                message: xd
            }
        });
        res.json(response);
    }
    catch(e){
        res.json({error: "put unsuccessful"});
    }
});

module.exports = router;