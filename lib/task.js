var tasks = [
  {task:"meetup", description:"going to the js meetup"},
  {task:"homework", description:"doing the itc298 homework"}
    ];

exports.get = function(task) {
    return tasks.find(function(item) {
       return item.task === task;
    });
}

exports.add = function(newTask) {
    var found = false;
    tasks.forEach(function(item,index){
        if (item.task == newTask.task) {
            tasks[index] = newTask;
            found = true;
        }
    });
    if (!found) {
        tasks.push(newTask);
    }
    return {"added": !found, "total": tasks.length };
}

exports.delete = function(task) {
    var deleted = false;
    console.log(task)
    tasks.forEach(function(item,index){
        if (item.task == task) {
            console.log(item)
            tasks.splice(index, 1);
            deleted = true;
        }        
    });
    return { "deleted": deleted, "total": tasks.length };
}

exports.getAll = function() {
        return tasks;
}

exports.find = function(task) {
    return tasks.filter(function(item) {
       return item.task === task;
    });
}
