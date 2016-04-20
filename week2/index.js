var bodyParser = require('body-parser');


var express = require("express");
var exphbs  = require('express-handlebars');

var app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('home');
});
// parameters sent with 

  app.post('/search', function(req, res) {
  
    var tasks =["homeworks","going out", "meetup"];
    var description = ["doing HW2 ","going to the mall with friends","attend the js meetup"];
    var date = ["04/17/2016","04/20/2016","05/05/2016"];
    
   
    for (var i=0; i<tasks.length; i++){
        if (req.body.task== tasks[i]){
            var result = "You searched for : " +req.body.task+ "<br>" +tasks[i] + "<br>" + description[i] + "<br>" +date[i] +'<br><a href="/">Back</a>';
            break;
        }else{
            result = "You searched for : " +req.body.task+ "<br>" +"No such a task" +'<br><a href="/">Back</a>';
        }
        
    }
     res.send(result);
});

app.listen(process.env.PORT);