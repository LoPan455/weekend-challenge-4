console.log('starting up the server');
var express = require('express'); //brings in the Express module
var app = express(); //this is a function that RETURNS an OBJECT
var bodyParser = require('body-parser');
var tasks = require('./routes/tasks.js')
var serverPort = 5001
app.use(express.static('server/public/'));
app.use(bodyParser.urlencoded({extended: true}));
app.use('/tasks', tasks)
console.log('listening on server port ',serverPort);
app.listen(serverPort);
