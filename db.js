var fs = require('fs');
var path = require('path');

var DB_FILE = path.join(__dirname, './db.json');

module.exports = {

  createEmployee: function (employerId, name, email, phoneNumber, next) {
    var that = this;

    fs.readFile(DB_FILE, function (err, data) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      var db = JSON.parse(data);
      if (that._getEmployee(db, employerId, name)) return next(new Error('Employee already exists!'));
      var newEmployee = that._generateEmployee(employerId, name, email, phoneNumber);

      db.employees.push(newEmployee);
      fs.writeFile(DB_FILE, JSON.stringify(db), function (err) {
        if (err) {
          console.error(err);
          process.exit(1);
        }
        next();
      });
    });
  },

  destroyEmployees: function (employerId, namesToDestroy, next) {
    var that = this;

    fs.readFile(DB_FILE, function (err, data) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      var db = JSON.parse(data);
      db.employees = that._filterOutEmployees(db, employerId, namesToDestroy);

      fs.writeFile(DB_FILE, JSON.stringify(db), function (err) {
        if (err) {
          console.error(err);
          process.exit(1);
        }

        next();
      });
    });
  },

  getEmployerId: function (email, password, next) {
    fs.readFile(DB_FILE, function (err, data) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      var id = JSON.parse(data).employers.findIndex(function (employer) {
        return employer.email === email && employer.password === password;
      });

      next(null, id);
    });
  },

  getEmployersEmployees: function (employerId, next) {
    fs.readFile(DB_FILE, function (err, data) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      var employees = JSON.parse(data).employees.filter(function (employee) {
        return employee.employerId === employerId;
      });

      next(null, employees);
    });
  },

  showEmployee: function (employerId, name, next) {
    var that = this;

    fs.readFile(DB_FILE, function (err, data) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      var db = JSON.parse(data);
      var foundEmployee = that._getEmployee(db, employerId, name);
      if (!foundEmployee) return next(new Error('Employee not found!'));

      next(null, foundEmployee);
    });
  },

  updateEmployee: function (employerId, name, email, phoneNumber, next) {
    var that = this;

    fs.readFile(DB_FILE, function (err, data) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      var db = JSON.parse(data);
      var foundEmployee = that._getEmployee(db, employerId, name);
      if (!foundEmployee) return next(new Error('Employee not found!'));

      foundEmployee.email = email;
      foundEmployee.phoneNumber = phoneNumber;
      fs.writeFile(DB_FILE, JSON.stringify(db), function (err) {
        if (err) {
          console.error(err);
          process.exit(1);
        }
        next();
      });
    });
  },

  _generateEmployee (employerId, name, email, phoneNumber) {
    return {
      employerId: employerId,
      name: name,
      phoneNumber: phoneNumber,
      email: email
    };
  },

  _getEmployee (db, employerId, name) {
    return db.employees.find(function (employee) {
      return employee.employerId === employerId && employee.name === name;
    });
  },

  _filterOutEmployees (db, employerId, namesToFilter) {
    return db.employees.reduce(function (employees, employee) {
      if (employee.employerId !== employerId) return employees.concat(employee);
      if (namesToFilter.indexOf(employee.name) === -1) return employees.concat(employee);
      return employees;
    }, []);
  }
};
