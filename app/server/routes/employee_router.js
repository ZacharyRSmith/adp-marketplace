var express = require('express');

var employeeController = require('../controllers/employee_controller');



var employeeRouter = express.Router();

employeeRouter.get('/', function (req, res, next) {
  if (req.query.name) {
    return employeeController.show(req, res, next);
  } else {
    return employeeController.index(req, res, next);
  }
});

employeeRouter.post('/', employeeController.create);

employeeRouter.put('/', employeeController.update);

employeeRouter.delete('/', employeeController.destroy);

employeeRouter.post('/auth', employeeController.auth);


module.exports = employeeRouter;
