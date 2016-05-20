var db = { employees: [], employers: [{
  // empty employer object so first employerId is 1
}, {
  email: 'user1@example.com',
  password: 'password'
}, {
  email: 'user2@example.com',
  password: 'password'
}] };
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
var mockEmployee4 = {
  employerId: 2,
  name: 'John Doe',
  email: 'john.doe@example.com',
  phoneNumber: '(555) 555-0004'
};
var mockEmployee5 = {
  employerId: 2,
  name: 'John Doe\'s Sister',
  email: 'johns.sister@example.com',
  phoneNumber: '(555) 555-0005'
};
var mockEmployee6 = {
  employerId: 2,
  name: 'John Doe\'s Brother',
  email: 'johns.brother@example.com',
  phoneNumber: '(555) 555-0006'
};
db.employees = [
  mockEmployee1,
  mockEmployee2,
  mockEmployee3,
  mockEmployee4,
  mockEmployee5,
  mockEmployee6
];
// END MOCK DATA



module.exports = {

  auth: function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    if (!email || !password) return res.sendStatus(400);
    var employerId = _getEmployerId(email, password);
    if (employerId === -1) return res.sendStatus(404);

    var employersEmployees = db.employees.filter(function (employee) {
      return employee.employerId === employerId;
    });

    return res.status(200).send({
      employees: employersEmployees,
      employerId: employerId
    });
  },

  create: function (req, res, next) {
    var employerId = req.body.employerId;
    var name = req.body.name;
    var email = req.body.email || null;
    var phoneNumber = req.body.phoneNumber || null;

    if (!employerId || !name) return res.sendStatus(400);
    if (_getEmployee(employerId, name)) return res.sendStatus(409);

    _createEmployee(employerId, name, email, phoneNumber);
    // TODO respond with 'Location' header
    return res.sendStatus(201);
  },

  destroy: function (req, res, next) {
    var employerId = req.body.employerId;
    var employeeNames = req.body.employeeNames;
    if (!employerId || !Array.isArray(employeeNames)) return res.sendStatus(400);
    if (!employeeNames.every(function (name) {
      return _getEmployee(employerId, name);
    })) return res.sendStatus(404);

    employeeNames.forEach(function (name) { _deleteEmployee(employerId, name); });
    return res.sendStatus(200);
  },

  index: function (req, res, next) {
    return res.status(200).send(db.employees);
  },

  show: function (req, res, next) {
    var employerId = parseInt(req.query.employerId);
    var name = req.query.name;
    var foundEmployee = _getEmployee(employerId, name);
    if (!foundEmployee) return res.sendStatus(404);

    return res.status(200).send(foundEmployee);
  },

  update: function (req, res, next) {
    var employerId = req.body.employerId;
    var name = req.body.name;
    var email = req.body.email || null;
    var phoneNumber = req.body.phoneNumber || null;

    if (!employerId || !name) return res.sendStatus(400);
    var foundEmployee = _getEmployee(employerId, name);
    if (!foundEmployee) return res.sendStatus(404);

    _updateEmployee(foundEmployee, email, phoneNumber);
    return res.sendStatus(200);
  }
};



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

function _deleteEmployee (employerId, name) {
  var foundIndex = db.employees.findIndex(function (e) {
    return e.employerId === employerId && e.name === name;
  });
  db.employees.splice(foundIndex, 1);
}

function _getEmployee (employerId, name) {
  return db.employees.find(function (employee) {
    return employee.employerId === employerId && employee.name === name;
  });
}

function _getEmployerId (email, password) {
  return db.employers.findIndex(function (employer) {
    return employer.email === email && employer.password === password;
  });
}

function _updateEmployee (employee, email, phoneNumber) {
  employee.email = email;
  employee.phoneNumber = phoneNumber;
}
