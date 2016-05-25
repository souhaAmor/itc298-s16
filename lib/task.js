var Task = require("../models/task.js");

new Task({ "task": "meeting",
    "description": "A work meeting "}).save();
    
exports.get = function(task) {
 
  return  Task.find({task: task}, function (err, items) {
 if(err) return console.error(err);


});
}

exports.add = function(newTask,task_id) {
    var found = false;
    var query = Task.findOne({ task: newTask.task });
    if(query) 
    {
    found=true;
    Task.update({_id:task_id},{$set:newTask},function(err){
                    if(err) return console.error(err);
                });

    }
    if (!found) {
       new Task(newTask).save();
    }
    return {"added": !found, "total": Task.length };
}

exports.delete = function(task_id) {
    var deleted = false;
    
    
    var query = Task.findOne({ _id: task_id });
    if(query) 
    {
     deleted=true;
    Task.remove({_id:task_id},function(err){
                    if(err) return console.error(err);
                });

    }
    
 
    return { "deleted": deleted, "total": Task.length };
}

exports.getAll = function() {
        return Task.find({}, function (err, items) {
             if(err) return console.error(err);


});
}

exports.find = function(task) {
    return Task.findOne({task:task}) ;
   
}
