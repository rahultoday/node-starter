var debug = require('debug')('P1');
// require('./database')()
//   .then(function(t){
//     console.log("Success");
//     console.log(t);
//   }).catch(function(er){
//     console.log("Migration error...");
//     console.log(er);
//     process.abort();
//   });

var app = require('./server');
app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});
