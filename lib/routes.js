module.exports = function(app) {
    //var task = require("../lib/task");
    var Task = require("../models/task.js");
    var back_link = "<p><a href='/'>Back</a>";
    var path = require('path');
    
    app.get('/', function(req,res){
       // Task.find(function(err,tasks) {
            res.type('text/html');
            res.sendFile(path.join(__dirname, '../angular', 'index.html'));
          //  res.render('home', {tasks: tasks} );    
       // }); 
    });

app.get('/detail/:task', function(req,res){


var task = req.params.task;
       Task.findOne({"task": task}, function (err, task) {
            if (err) return next(err);
            if (!task) {
                task = {task: task};
            }
            res.type('text/html');
            res.render('detail', {task: task } );
        });

       
});

app.get('/about', function(req,res){
    res.type('text/html');
    res.render('about');
});

app.post('/search', function(req,res){
   res.type('text/html');
    var header = 'Searching for: ' + req.body.task + '<br>';
    Task.findOne({task:req.body.task},function(err,tasks){
            if(err) return console.error(err);
    if (tasks) {
        res.send(header + "Found: " + back_link);
    } else {
        res.send(header + "Not found" + back_link);
    }
});




});


app.get('/add', function(req,res) {
   res.type('text/html');
   res.render("detail");
});

app.post('/add', function(req,res) {
   res.type('text/html');
    // construct new 'task' object for comparison against existing objects
     var newTask = {"task":req.body.task, "description":req.body.description};
    var task_id =req.body.id;

    Task.update({_id:task_id},{$set:newTask},function(err){
                    if(err) {
       new Task(newTask).save();
        res.send("Added: " + req.body.task + back_link);
    }
         res.send("Updated: " + req.body.task + back_link);
                });

    
   
  
   
});

app.post('/delete', function(req,res){
    res.type('text/html');
    
    console.log(req.body);
    var deleted = false;
    
    var task_id=req.body.id;
   
    
    
     
    Task.remove({_id:task_id},function(err){
        
        console.log(err);
                    if(err) return console.error(err);
                    deleted=true;
                    
                      if (deleted) {
        res.send("Deleted: " +  req.body.task + back_link);
    } else {
        res.send(req.body.task + " not found" + back_link);
    }
                });

   
    
  
  
  
    
});



// API routes

app.post('/api/add', function(req,res) {
        console.log(req.body);
        var new_task = {"task":req.body.task, "description":req.body.description};
        Task.findByIdAndUpdate({_id:req.body.id}, new_task, function(err, result) {
            if (err) {
                new Task(new_task).save(function(err){
                res.json({"result":"saved"});    
                });
            } else {
                res.json({"result":"saved"});    
            }
        });
    });

app.post('/api/delete', function(req,res) {
          
    
    console.log(req.body);
    var deleted = false;
    
    var task_id=req.body.id;
   
    
    
     
    Task.remove({_id:task_id},function(err){
        
        console.log(err);
                    if(err) return console.error(err);
                    deleted=true;
                    
                      if (deleted) {
        res.json("Deleted: " +  req.body.task );
    } else {
        res.json(req.body.task + " not found" );
    }
                });

   
    
  
  
  
    
});
    app.get('/api/detail/:task', function(req,res) {
         Task.findOne({"task": req.params.task}, function (err, found) {
            if (found) {
                res.json(found);    
            } else {
                res.status(404).send("404 - not found");    
            }
        });
    
    
    });
    
    
}
