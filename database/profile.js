var config = require('./knexconfig');
var knex = require('knex')(config);
var profiles = function(){
  return knex.schema.createTableIfNotExists('profiles', function(table) {
  table.increments('id').primary();
  table.string('user_name');
  table.string('first_name');
  table.string('second_name');
  table.string('addr_line1');
  table.string('addr_line2');
  table.string('city');
  table.string('state');
  table.string('pin');
  table.string('image_path');
  table.string('pan_number');
  table.integer('mobile_number');
  table.string('voters_id');
  table.string('sponsers_name');
  table.string('sponser_number');
  table.string('verified');
});
};
module.exports = profiles;
