var bodyParser = require('body-parser');
var path = require('path');
var express = require('express');

var indexRouter = require('./routes/index');

// var db = { };
// var mockEmployee1 = {
//   employerId: 1,
//   name: 'Jane Doe',
//   phoneNumber: '(555) 555-0001',
//   email: 'jane.doe@example.com'
// };
// var mockEmployee2 = {
//   employerId: 2,
//   name: 'Jane Doe\'s Sister',
//   phoneNumber: '(555) 555-0002',
//   email: 'janes.sister@example.com'
// };
// var mockEmployee3 = {
//   employerId: 3,
//   name: 'Jane Doe\'s Brother',
//   phoneNumber: '(555) 555-0003',
//   email: 'janes.brother@example.com'
// };
// db.employees = [
//   mockEmployee1,
//   mockEmployee2,
//   mockEmployee3
// ];

var server = express();

// Server config:
server.use(bodyParser.json());

// Client
server.use(express.static(path.join(__dirname, '../client')));

// API routing
server.use('/api', indexRouter);

// Make server listen:
var port = process.env.PORT || 3000;
server.listen(port);
console.log('Server now listening on port %s.', port);
