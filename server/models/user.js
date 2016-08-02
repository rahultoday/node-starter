var config = require('./knexconfig');
console.log(config);
var knex = require('knex')(config);
var bookshelf = require('bookshelf')(knex);
var User = bookshelf.Model.extend({
    tableName: 'users'
});
module.exports = User;
