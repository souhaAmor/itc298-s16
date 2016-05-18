var credentials = require("../lib/credentials");
var mongoose = require("mongoose");

// remote db settings 
// var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 }  } };       
 //mongoose.connect(credentials.mongo.connectionString, options);

var ip = process.env.ip || "127.0.0.1";
mongoose.connect("mongodb://"+ip+"/souhaamor_db");
var conn = mongoose.connection; 
conn.on('error', console.error.bind(console, 'connection error:'));  

var taskSchema = mongoose.Schema({
    task: String,
    description: String,
});

module.exports = mongoose.model('task', taskSchema);
