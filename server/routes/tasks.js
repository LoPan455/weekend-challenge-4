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
      // Now, we're gonna' git stuff!!!!!
      client.query('SELECT * FROM "tasks";', function(errorMakingQuery, result){
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
}); // end router.get for /getTasks


// POST routes

router.post('/submitTask', function(req,res){
  console.log('/submitTask hit successfully');
  res.sendStatus(200);
});

router.post('/completeTask',function(req,res){
  console.log('/completeTask hit successfully');
  res.sendStatus(200);
})

// DELETE routes

router.delete('/deleteTask', function (req,res){
  console.log('/deleteTask hit succesfully');
  res.sendStatus(200);
});

module.exports = router;
