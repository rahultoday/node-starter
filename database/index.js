var config = require('./knexconfig');
var knex = require('knex')(config);
function migrate(){
  return knex.schema.createTableIfNotExists('users', function(table) {
  table.increments('id');
  table.string('user_name');
  table.string('digest');
});
};
module.exports = migrate;
