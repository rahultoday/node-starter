'use strict';
const userController = require('./../controllers/userController');

module.exports = (server)=> {
  server.post('/users/create', userController.addUser);
  server.get('/users/list', userController.listUsers);
  server.post('/users/login', userController.validateUser);
  server.post('/users/update', userController.updateUer);
  server.delete('/users/delete',userController.deleteUser);
};
