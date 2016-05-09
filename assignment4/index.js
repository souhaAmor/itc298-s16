var express = require("express");
var app = express();
var task = require("../lib/task.js");

var back_link = "<p><a href='/'>Back</a>";

// configure Express app
app.set('port', process.env.PORT || 3000);
app.use(express.static('public'));
app.use(require("body-parser").urlencoded({extended: true}));

// set template engine
var handlebars = require('express-handlebars').create({defaultLayout: 'main', extname: '.hbs' });
app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs' );

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


app.use(function(req,res) {
    res.type('text/plain'); 
    res.status(404);
    res.send('404 - Not found');
});

app.listen(app.get('port'), function() {
    console.log('Express started');    
});
