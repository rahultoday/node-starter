/**
 * Created by vineeth on 14/10/16.
 */

'use strict';
const profileController = require('./../controllers/profileController');

module.exports = (server)=> {
  server.post('/profile/create', profileController.addProfile);
  server.post('/profile/update', profileController.editProfile);
  server.post('/profile/delete',profileController.deleteProfile);
  server.get('/profile/list',profileController.listProfiles);
};
