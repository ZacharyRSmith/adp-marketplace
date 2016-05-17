var bodyParser = require('body-parser');
var path = require('path');
var express = require('express');

var employeeRouter = require('./routes/employee_router');



// SET UP SERVER
var server = express();

// Server config:
server.use(bodyParser.json());

// Client
server.use(express.static(path.join(__dirname, '../client')));

// API routing
server.use('/api/employee', employeeRouter);

// Make server listen:
var port = process.env.PORT || 3000;
server.listen(port);
console.log('Server now listening on port %s.', port);
