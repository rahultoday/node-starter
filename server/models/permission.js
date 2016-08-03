var config = require('./knexconfig');
var knex = require('knex')(config);
var User = require('./user');
var bookshelf = require('bookshelf')(knex);
var Permission = bookshelf.Model.extend({
    tableName: 'permissions',
    user: function() {
      return this.belongsTo('User');
    }
});
module.exports = Permission;
