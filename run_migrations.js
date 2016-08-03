var _ = require('lodash-node');
var tableSchema = require('./database');
var tables_names = _.keys(tableSchema);
console.log("Migrations starting....");
_.each(tables_names, function(tables_name){
  console.log("Creating table "+ tables_name+"...");
tableSchema[tables_name]()
  .then(function(t){
    console.log("Created table "+ tables_name );
  }).catch(function(er){
    console.log("Migration error...");
    console.log(er);
    process.abort();
  });
});
