var config = require('./knexconfig');
var actions = require('../actions');
var knex = require('knex')(config);
var bookshelf = require('bookshelf')(knex);
var User = bookshelf.Model.extend({
    tableName: 'users'
});
User.prototype.validate_password = actions.verifyPassword;
User.prototype.hashPassword = actions.hashPassword;
module.exports = User;
