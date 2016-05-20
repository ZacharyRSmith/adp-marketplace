var db = require('../../../db');

module.exports = {

  auth: function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    if (!email || !password) return res.sendStatus(400);

    db.getEmployerId(email, password, function (err, id) {
      if (err) return res.sendStatus(500);
      if (id === -1) return res.sendStatus(404);

      db.getEmployersEmployees(id, function (err, employees) {
        if (err) return res.sendStatus(500);

        res.status(200).send({
          employees: employees,
          employerId: id
        });
      });
    });
  },

  create: function (req, res, next) {
    var employerId = req.body.employerId;
    var name = req.body.name;
    var email = req.body.email || null;
    var phoneNumber = req.body.phoneNumber || null;
    if (!employerId || !name) return res.sendStatus(400);

    db.createEmployee(employerId, name, email, phoneNumber, function (err) {
      if (err) return res.sendStatus(409);
      // TODO respond with 'Location' header
      return res.sendStatus(201);
    });
  },

  destroy: function (req, res, next) {
    var employerId = req.body.employerId;
    var employeeNames = req.body.employeeNames;
    if (!employerId || !Array.isArray(employeeNames)) return res.sendStatus(400);

    db.destroyEmployees(employerId, employeeNames, function (err) {
      if (err) return res.sendStatus(404);
      return res.sendStatus(200);
    });
  },

  show: function (req, res, next) {
    var employerId = parseInt(req.query.employerId);
    var name = req.query.name;
    if (!employerId || !name) return res.sendStatus(400);

    db.showEmployee(employerId, name, function (err, data) {
      if (err) return res.sendStatus(404);
      res.status(200).send(data);
    });
  },

  update: function (req, res, next) {
    var employerId = req.body.employerId;
    var name = req.body.name;
    var email = req.body.email || null;
    var phoneNumber = req.body.phoneNumber || null;
    if (!employerId || !name) return res.sendStatus(400);

    db.updateEmployee(employerId, name, email, phoneNumber, function (err) {
      if (err) return res.sendStatus(404);

      return res.sendStatus(200);
    });
  }
};
