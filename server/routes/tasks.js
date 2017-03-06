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
var pool = new pg.Pool(config);

// GET routes
router.get('/getTasks', function(req,res){
  console.log('/getTasks URL has been reached');
  //connect to the db with a connection from the pool
  pool.connect(function(errorConnectingToDatabase, client, done){
    if(errorConnectingToDatabase) {
      // There was an error connecting to the database
      console.log('Error connecting to database: ', errorConnectingToDatabase);
      res.sendStatus(500);
    } else {
      // We connected to the database!!!
      // We want completed tasks to appear at the bottom of the list
      client.query('SELECT * FROM "tasks" '+
      'ORDER BY complete ASC, id;', function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Error making the database query: ', errorMakingQuery);
          res.sendStatus(500);
        } else {
          res.send(result.rows);
        }
      });
    }
  });
});


// POST routes
router.post('/submitTask', function(req,res){
  console.log('/submitTask hit successfully');
  var newTask = req.body
  console.log('newTask is set to: ',newTask);
  //connect to the db with a connection from the pool
    pool.connect(function(errorConnectingToDatabase, client, done){
      if(errorConnectingToDatabase) {
        // There was an error connecting to the database
        console.log('Error connecting to database: ', errorConnectingToDatabase);
        res.sendStatus(500);
      } else {
        // We connected to the database!!! Now, we're gonna' ADD stuff!!!!!
         client.query('INSERT INTO tasks (task_name) ' +
         'VALUES ($1);',
         [newTask.task_name],
         function(errorMakingQuery, result){
          done();
          if(errorMakingQuery) {
            console.log('Error making the database query: ', errorMakingQuery);
            res.sendStatus(500);
          } else {
            res.sendStatus(201);
          }//end else
        });//end client.query()
      }//end else
    });//end pool.connect()
  }); // end router.get for /submitTasks


//DELETE Routes
router.delete('/deleteTask', function(req,res){
  var taskToDelete =req.body;
  //connect to the db with a connection from the pool
  pool.connect(function(errorConnectingToDatabase, client, done){
  if(errorConnectingToDatabase) {
    // There was an error connecting to the database
    console.log('Error connecting to database: ', errorConnectingToDatabase);
    res.sendStatus(500);
  } else {
    // We connected to the database!!! Now, we're gonna' DELETE stuff!!!!!
      client.query('DELETE FROM tasks ' +
        'WHERE id=$1;',
        [taskToDelete.id],
        function(errorMakingQuery, result){
          done();
          if(errorMakingQuery) {
            console.log('Error making the database query: ', errorMakingQuery);
            res.sendStatus(500);
          } else {
            res.sendStatus(200);
          }
      });
    }
  });
});

//PUT route

  router.put('/completeTask', function(req,res){
    var taskToComplete = req.body;
    pool.connect(function(errorConnectingToDatabase, client, done) {
    if(errorConnectingToDatabase) {
      // There was an error connecting to the database
      console.log('Error connecting to database: ', errorConnectingToDatabase);
      res.sendStatus(500);
    } else {
      //The query syntax will toggle the value of 'complete' to the opposite boolean value
      client.query('UPDATE tasks ' +
      'SET complete = NOT complete ' +
      'WHERE id=$1;',
      [taskToComplete.id],
      function(errorMakingQuery, result){
      done();
      if(errorMakingQuery) {
        console.log('Error making the database query: ', errorMakingQuery);
        res.sendStatus(500);
        } else {
        res.sendStatus(200);
        }
      });
    }
  });
});




module.exports = router;
