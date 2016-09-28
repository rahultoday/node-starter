var config = require('./knexconfig');
var knex = require('knex')(config);
var users = function(){
  return knex.schema.createTableIfNotExists('users', function(table) {
  table.increments('id').primary();
  table.string('user_name');
  table.string('digest');
  table.string('first_name');
  table.string('second_name');
  table.string('role');
  table.string('image_path');
});
};
module.exports = users;
