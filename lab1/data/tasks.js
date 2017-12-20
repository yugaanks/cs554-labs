const mongoCollections=require("../config/mongoCollections");
const tasks=mongoCollections.tasks;
const uuid=require('node-uuid');

let exportedMethods={
	getAllTasks(skip, take) {
		return tasks().then((c)=>{
			return c.find().skip(skip).limit(take).toArray();
		});
	},
	getTaskById(id){
		return tasks().then((c)=>{
			return c.findOne({ _id: id }).then((task)=>{
				if(!task)
					throw "Not found";
				return task;
			}).catch((err)=>{
				throw "internal error";
			});
		});
	},
	addTask(title, description, hoursEstimated, completed, comments){
		return tasks().then((c)=>{
			let newTask={
				_id: uuid.v4(),
				title: title,
				description: description,
				hoursEstimated: hoursEstimated,
				completed: completed,
				comments: comments
			}
			return c.insertOne(newTask).then((newInsertInformation)=>{
				return newInsertInformation.insertedId;
			}).then((newId) => {
                return this.getTaskById(newId);
            });
		});
	},
	putTask(id, title, description, hoursEstimated, completed, comments){
		return tasks().then((c)=>{
			let updatedTask= {
				title: title,
				description: description,
				hoursEstimated: hoursEstimated,
				completed: completed,
				comments: comments
			};
			return c.updateOne({_id: id}, updatedTask).then((result)=>{
				return this.getTaskById(id);
			}).catch((err)=>{
				throw "Task not found";
			});
		});
	},
	patchTask(id, title, description, hoursEstimated, completed, comments){
		return tasks().then((c)=>{
			let updatedTask={};
			if(title)
				updatedTask.title=title;
			if(description)
				updatedTask.description=description;
			if(hoursEstimated)
				updatedTask.hoursEstimated=hoursEstimated;
			if(completed!=null)
				updatedTask.completed=completed;
			if(comments)
				updatedTask.comments=comments;
			return c.updateOne({_id: id}, {$set: updatedTask}).then((result)=>{
				return this.getTaskById(id);
			}).catch((err)=>{
				throw "Not found";
			});
		});
	},
	addComment(id, name, comment){
		return tasks().then((c)=>{
			let newComment={
				id: uuid.v4(),
				name: name,
				comment: comment
			};
			return c.update({_id: id}, {$push: {comments: newComment}}).then((result)=>{
				return this.getTaskById(id);
			}).catch((err)=>{
				throw "task not found";
			});
		});
	},
	deleteComment(taskId, commentId){
		return tasks().then((c)=>{
			return c.update({_id: taskId}, {$pull: {comments: {id: commentId}}}).then((result)=>{
				return this.getTaskById(taskId);
			}).catch((err)=>{
				throw "task id or comment id not found";
			});
		});
	}
}
module.exports = exportedMethods;