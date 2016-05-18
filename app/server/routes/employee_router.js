var express = require('express');

var employeeController = require('../controllers/employee_controller');



var employeeRouter = express.Router();

employeeRouter.get('/', function (req, res, next) {
  if (req.query.name) {
    employeeController.show(req, res, next);
  } else {
    employeeController.index(req, res, next);
  }
});

employeeRouter.post('/', employeeController.create);

employeeRouter.put('/', employeeController.update);

employeeRouter.delete('/', employeeController.destroy);



module.exports = employeeRouter;
