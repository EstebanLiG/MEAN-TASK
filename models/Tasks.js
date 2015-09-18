var mongoose = require('mongoose');

var TasksSchema = new mongoose.Schema({
  name: String,
  priority: Number
});

mongoose.model('Tasks', TaskSchema);
