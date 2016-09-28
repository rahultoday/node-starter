var users_schema = require('./users');
var permissions_schema = require('./permissions');
var profiles_schema = require('./profile');
var tableSchema = {
  users: users_schema,
  permissions: permissions_schema,
  profiles: profiles_schema
};
module.exports = tableSchema;
