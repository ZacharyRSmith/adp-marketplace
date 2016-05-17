var express = require('express');

var employeeController = require('../controllers/employee_controller');



var employeeRouter = express.Router();

employeeRouter.get('/', employeeController.get);

employeeRouter.post('/', employeeController.create);

employeeRouter.put('/', employeeController.update);

employeeRouter.delete('/', employeeController.destroy);



module.exports = employeeRouter;
