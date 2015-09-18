var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var mongoose = require('mongoose');
var Tasks = mongoose.model('Tasks');

/* GET List tasks */
router.get('/tasks', function(req, res, next){
  Tasks.find(function(err, tasks){
    if(err){
      return next(err);
    }
    res.json(tasks);
  });
});

/* POST Add task */
router.post('/task', function(req, res, next){
  var task = new Tasks(req.body);
  task.save(function(err, task){
    if(err){
      return next(err);
    }
    res.json(task);
  });
});

/* PUT Update task */
router.put('/task/:id', function(req, res){
  Tasks.findById(req.params.id, function(err, task){
    task.name = req.body.name;
    task.priority = req.body.priority;
    task.save(function(err){
      if(err){
        res.send(err);
      }
      res.json(task);
    });
  });
});

module.exports = router;
