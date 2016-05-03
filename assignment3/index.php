var bodyParser = require('body-parser');
  var express = require('express');
  var exphbs  = require('express-handlebars');
  var task = require("../lib/task.js")

     
  var app = express();
  
  app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('home');
});
 
 

     
  app.post('/search', function(req, res) {
      var search = req.body.task;
    
    
      var exist = task.findTask(search);
     
     
     
   var result=task.result(exist,search);
    
     
      res.send(result);
      
  });
  
 app.get('/add', function(req, res) {
     var task =req.param("task");
     if (task == undefined){
         task = "";
     }

     
      var task_field =' task:<input type="text" name="task" value="'+task+'"/><br>';
     var description_field = 'description :<input type="text" name="description" /><br>';
    var form= '<form action="/save" method="POST">'+task_field + description_field+'<button> add</button></form>';
   
     
  
     res.send(form);
 });
 
 
 app.post('/save', function(req, res) {
    var t_task = req.body.task;
  
     var t_description = req.body.description;
  
    
   
   
 var result= task.save(t_task,t_description);
    res.send(result);
 });
 
 app.get('/edit' , function(req, res) {
     var t_task = req.param("task");
     var t_detail = task.findTask(t_task);
     if (t_detail != undefined){
         var t_description = t_detail.description;
        
     }
     var task_field =' task:<input type="text" name="task" value="'+t_task+'"/><br>';
     var description_field = 'description :<input type="text" name="description" value="'+t_description+'"/><br>'
        ;
        var form='<form action="/update" method="POST">'+task_field + description_field+'<button>Update</button></form>';
     res.send(form);
 
 });
 
 app.post('/update', function(req, res) {
    var t_task = req.body.task;
    var t_description = req.body.description;
   
   var result=task.updateTask(t_task,t_description);
    res.send(result);
    
 });
 
 app.get('/rm' , function(req, res) {
     var t_task = req.param("task");
    
 var result = task.remove(t_task);
    res.send(result);
 });
  
  app.listen(process.env.PORT); 
