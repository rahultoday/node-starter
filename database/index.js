var users_schema = require('./users');
var permissions_schema = require('./permissions');
var tableSchema = {
  users: users_schema,
  permissions: permissions_schema
};
module.exports = tableSchema;
