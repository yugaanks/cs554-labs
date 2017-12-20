var dummy_data=require("./dummy_data.js");

var dummy=dummy_data.returnArray();

let method = {
	getById(id) {
		//console.log(dummy);
		return new Promise((res, rej)=>{
			for(let i=0;i<dummy.length;i++) {
				if(dummy[i].id==id) {
					res(dummy[i]);
					return;
				}
			}
			rej("id not found");
			
		});
		
	}, 
	add(first_name, last_name, email, gender, ip) {
		return new Promise((res, rej)=>{
			var id=dummy[dummy.length-1].id+1;
			let new_person={
				"id": id, "first_name": first_name, "last_name": last_name,
				"email": email, "gender": gender, "ip_address": ip 
			};
			//console.log(new_person);
			dummy[dummy.length]=new_person;
			res(dummy[dummy.length-1]);
		}, (err)=>{
			rej(err);
		});
	},
	delete(id) {
		return new Promise((res, rej)=>{
			for(let i=0;i<dummy.length;i++) {
				if(dummy[i].id==id) {
					dummy.splice(i, 1);
					res(true);
				}
			}
			rej("id not found");
		});
	},
	update(id, first_name, last_name, email, gender, ip) {
		return new Promise((res, rej)=>{
			for(let i=0;i<dummy.length;i++) {
				if(dummy[i].id==id) {
					dummy[i]={
						"id": dummy[i].id, "first_name": first_name, "last_name": last_name,
						"email": email, "gender": gender, "ip_address": ip
					}
					res(dummy[i]);
				}
			}
			rej("id not found");
		});
	}
}

module.exports=method;