module.exports = function(app) {
    var task = require("../lib/task");
    
    var back_link = "<p><a href='/'>Back</a>";
    
    
    app.get('/', function(req,res){
    res.type('text/html');
    res.render('home', {tasks: task.getAll()} );    
});

app.get('/detail/:task', function(req,res){
    res.type('text/html');
    res.render('detail', {task: task.get(req.params.task)} );    
});

app.get('/about', function(req,res){
    res.type('text/html');
    res.render('about');
});

app.post('/search', function(req,res){
    res.type('text/html');
    var header = 'Searching for: ' + req.body.task + '<br>';
    var found = task.find(req.body.task);
    if (found) {
        res.send(header + "Found: " + found.length);
    } else {
        res.send(header + "Not found");
    }
});


app.get('/add', function(req,res) {
   res.type('text/html');
   res.render("detail");
});

app.post('/add', function(req,res) {
    res.type('text/html');
    // construct new 'task' object for comparison against existing objects
    var newtask = {"task":req.body.task, "description":req.body.description}
    var result = task.add(newtask);
    if (result.added) {
        res.send("Added: " + req.body.task + "<br>New total = " + result.total + back_link);
    } else {
        res.send("Updated: " + req.body.task + back_link);
    }
});

app.post('/delete', function(req,res){
    res.type('text/html');
    var result = task.delete(req.body.task);
    if (result.deleted) {
        res.send("Deleted: " +  req.body.task + '<br>New total = ' + result.total + back_link);
    } else {
        res.send(req.body.task + " not found" + back_link);
    }
});



// API routes
    app.get('/api/tasks', function(req,res) {
        var tasks = task.getAll();
        if (tasks) {
            res.json(tasks);    
        } else {
            res.status(404).send("404 - not found");    
        }
    });

    app.get('/api/detail/:task', function(req,res) {
        var found =task.get(req.params.task);
        if (found) {
            res.json(found);    
        } else {
            res.status(404).send("404 - not found");    
        }
    });
    
    
    
    
    
}
