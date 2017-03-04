var express = require('express');
var router = express.Router();
var pg = require('pg');
var config = {
  database: 'phi', // the name of the database
  host: 'localhost', // where is your database
  port: 5432, // the port number for your database
  max: 10, // how many connections at one time
  idleTimeoutMillis: 30000 // 30 seconds to try to connect
};

// GET routes
router.get('/getTasks', function(req,res){
  console.log('/getTasks URL has been reached');
  res.sendStatus(200);
});

// POST routes

router.post('/submitTask', function(req,res){
  console.log('/submitTask hit successfully');
  res.sendStatus(200);
});

// DELETE routes

router.delete('/deleteTask', function (req,res){
  console.log('/deleteTask hit succesfully');
  res.sendStatus(200);
});

module.exports = router;
