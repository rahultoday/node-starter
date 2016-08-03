var config = require('./knexconfig');
var knex = require('knex')(config);
var migrate = function(){
  return knex.schema.createTableIfNotExists('users', function(table) {
  table.increments('id');
  table.string('user_name');
  table.string('digest');
});
};
module.exports =  migrate;
// migrate()
//   .then(function(t){
//     console.log("Success");
//     console.log(t);
//   }).catch(function(er){
//     console.log("Migration error...");
//     console.log(er);
//     process.abort();
//   });
