var Task = require("./models/task.js");

new Task({ "task": "meeting",
    "description": "A work meeting "}).save();

Task.find({}, function (err, items) {
//if (err) return next(err);

console.log(items);

});
