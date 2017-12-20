const express=require('express');
const router=express.Router();
const data = require("../data");
const tasks=data.tasks;

router.get('/api/tasks', (req,res)=>{
	let skip=0,take=20;
	if(req.query.skip)
		skip=Number(req.query.skip);
	if(req.query.take)
		take=Number(req.query.take);
	tasks.getAllTasks(skip, take).then((result)=>{
		res.json(result);
	}).catch((err)=>{
		res.json(err);
	});
});

router.get('/api/tasks/:id', (req,res)=>{
	tasks.getTaskById(req.params.id).then((task)=>{
		res.json(task);
	}).catch((error) => {
        // Not found!
        res.status(404).json({message: "Task not found"});
    });
});

router.post('/api/tasks', (req,res)=>{
	let obj=req.body;
	if(!(obj.title && obj.description && obj.hoursEstimated && obj.completed!=undefined && obj.comments))
		res.status(400).send("Provide all details");
	else {
		tasks.addTask(obj.title, obj.description, obj.hoursEstimated, obj.completed, obj.comments).then((result)=>{
			res.json(result);
		}).catch((err)=>{
			res.status(500).send("Something wierd happened");
		});
	}
});

router.put('/api/tasks/:id', (req, res)=>{
	let obj=req.body;
	if(!(obj.title && obj.description && obj.hoursEstimated && obj.completed!=undefined && obj.comments))
		res.status(400).send("Provide all details");
	else {
		tasks.putTask(req.params.id, obj.title, obj.description, obj.hoursEstimated, obj.completed, obj.comments).then((task)=>{
			res.json(task);
		}).catch((err)=>{
			res.status(404).send(err);
		});
	}
});

router.patch('/api/tasks/:id', (req, res)=>{
	let obj=req.body;
	tasks.patchTask(req.params.id, obj.title, obj.description, obj.hoursEstimated, obj.completed, obj.comments).then((task)=>{
		res.json(task);
	}).catch((err)=>{
		res.status(404).send("Task Not found");
	});
});

router.post('/api/tasks/:id/comments', (req, res)=>{
	let obj=req.body;
	if(obj.name && obj.comment){
		tasks.addComment(req.params.id, obj.name, obj.comment).then((task)=>{
			res.json(task);
		}).catch((err)=>{
			res.status(404).send(err);
		});
	}
	else {
		res.status(400).send("Provide both name and comment info");
	}
});

router.delete('/api/tasks/:taskId/:commentId', (req, res)=>{
	tasks.deleteComment(req.params.taskId, req.params.commentId).then((task)=>{
		res.json(task);
	}).catch((err)=>{
		res.status(400).send(err);
	});
});
module.exports=router;