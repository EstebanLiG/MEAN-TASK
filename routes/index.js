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

module.exports = router;
