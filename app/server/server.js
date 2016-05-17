var bodyParser = require('body-parser');
var path = require('path');
var express = require('express');



var db = { employees: [] };
// BEGIN MOCK DATA
var mockEmployee1 = {
  employerId: 1,
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
  phoneNumber: '(555) 555-0001'
};
var mockEmployee2 = {
  employerId: 1,
  name: 'Jane Doe\'s Sister',
  email: 'janes.sister@example.com',
  phoneNumber: '(555) 555-0002'
};
var mockEmployee3 = {
  employerId: 1,
  name: 'Jane Doe\'s Brother',
  email: 'janes.brother@example.com',
  phoneNumber: '(555) 555-0003'
};
db.employees = [
  mockEmployee1,
  mockEmployee2,
  mockEmployee3
];
// END MOCK DATA



// SET UP ROUTING
var employeeRouter = express.Router();
employeeRouter.get('/', function (req, res, next) {
  var employerId = parseInt(req.query.employerId);
  var name = req.query.name;

  if (!name && !employerId) {
    return res.status(200).send(db.employees);
  } else {
    var foundEmployee = _getEmployee(employerId, name);
    if (!foundEmployee) return res.sendStatus(404);

    return res.status(200).send(foundEmployee);
  }
});
employeeRouter.post('/', function (req, res, next) {
  var employerId = req.body.employerId;
  var name = req.body.name;
  var email = req.body.email || null;
  var phoneNumber = req.body.phoneNumber || null;

  if (!employerId || !name) return res.sendStatus(400);
  if (_getEmployee(employerId, name)) return res.sendStatus(409);

  _createEmployee(employerId, name, email, phoneNumber);
  // TODO respond with 'Location' header
  return res.sendStatus(201);
});
employeeRouter.put('/', function (req, res, next) {
  var employerId = req.body.employerId;
  var name = req.body.name;
  var email = req.body.email || null;
  var phoneNumber = req.body.phoneNumber || null;

  if (!employerId || !name) return res.sendStatus(400);
  var foundEmployee = _getEmployee(employerId, name);
  if (!foundEmployee) return res.sendStatus(404);

  _updateEmployee(foundEmployee, email, phoneNumber);
  return res.sendStatus(200);
});
employeeRouter.delete('/', function (req, res, next) {
  var employerId = req.body.employerId;
  var name = req.body.name;

  if (!employerId || !name) return res.sendStatus(400);
  var foundEmployee = _getEmployee(employerId, name);
  if (!foundEmployee) return res.sendStatus(404);

  _deleteEmployee(foundEmployee);
  return res.sendStatus(200);
});



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



// HELPER FUNCTIONS

function _createEmployee (employerId, name, email, phoneNumber) {
  var newEmployee = {
    employerId: employerId,
    name: name,
    phoneNumber: phoneNumber,
    email: email
  };
  db.employees.push(newEmployee);
}

function _deleteEmployee (employee) {
  var foundIndex = db.employees.findIndex(function (e) {
    return e.employerId === employee.employerId && e.name === employee.name;
  });
  db.employees.splice(foundIndex, 1);
}

function _getEmployee (employerId, name) {
  return db.employees.find(function (employee) {
    return employee.employerId === employerId && employee.name === name;
  });
}

function _updateEmployee (employee, email, phoneNumber) {
  employee.email = email;
  employee.phoneNumber = phoneNumber;
}
