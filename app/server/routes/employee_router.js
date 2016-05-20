var express = require('express');

var employeeController = require('../controllers/employee_controller');



var employeeRouter = express.Router();

employeeRouter.get('/', employeeController.show);

employeeRouter.post('/', employeeController.create);

employeeRouter.put('/', employeeController.update);

employeeRouter.delete('/', employeeController.destroy);

employeeRouter.post('/auth', employeeController.auth);



module.exports = employeeRouter;
