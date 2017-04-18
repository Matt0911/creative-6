var express = require('express');
var router = express.Router();
/* Set up mongoose in order to connect to mongo database */
var mongoose = require('mongoose'); //Adds mongoose as a usable dependency

mongoose.connect('mongodb://localhost/templeDB');
var templeSchema = mongoose.Schema({ //Defines the Schema for this database
  Name: String,
  Temples: mongoose.Schema.Types.Mixed
});

var Temples = mongoose.model('Temples', templeSchema); //Makes an object from that schema as a model

var db = mongoose.connection; //Saves the connection as a variable to use
db.on('error', console.error.bind(console, 'connection error:')); //Checks for connection errors
db.once('open', function() { //Lets us know when we're connected
  console.log('Connected');
});


router.post('/temples', function(req, res, next) {
  console.log("POST temples route");
  console.log(req.body);

  var query = Temples.findOne({Name: req.body.Name});
  query.exec(function(err, person) {
    if (err) return console.error(err);
    if (person === null) {
      var newtemples = new Temples(req.body);
      console.log(newtemples);
      newtemples.save(function(err, post) {
        if (err) return console.error(err);
        console.log(post);
        res.sendStatus(200);
      });
    }
    else {
      for (temple in person.Temples) {
        person.Temples[temple] = req.body.Temples[temple];
      }
      person.markModified('Temples');
      person.save(function(err, post) {
        if (err) console.error(err);
        console.log(post);
        res.sendStatus(200);
      });
    }
  })
});

router.param('name', function(req, res, next, name) {
  console.log('find one: ' + name);
  var query = Temples.findOne({Name: name});
  query.exec(function (err, person) {
    if (err) return next(err);
    res.json(person);
  })
})

router.get('/temples/:name', function(req, res, next) {
  console.log('get name');
  console.log(req.name);
  res.json(req.name);
});

router.delete('/comment', function(req, res, next) {
  console.log('Delete route');
  Comment.remove({}, function(err){
    if (err) return console.error(err);
    else {
      console.log('deleted comments');
      res.sendStatus(200);
    }
  });
})

module.exports = router;
