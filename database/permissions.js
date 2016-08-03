var config = require('./knexconfig');
var knex = require('knex')(config);
var permissions = function(){
  return knex.schema.createTableIfNotExists('permissions', function(table) {
  table.increments('id');
  table.string('permission_name');
  table.integer('user_id').unsigned();
  table.foreign('user_id')
      .references('id')
      .inTable('users');
});
};
module.exports = permissions;
