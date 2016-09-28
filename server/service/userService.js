'use strict';
const mySqlService = require('./../dao/mysqlService');

module.exports = {
  listUsers: function (username, role, offSet, limit) {
    let condition = {};
    if (role && role !== "")
      condition = {"role": role};
    if (username && username !== "")
      condition['user_name'] = username;
    return mySqlService.find(condition, offSet, limit, 'users');
  },
  addUser: function (user) {
    let newUsers = [];
    newUsers.push(user);
    return mySqlService.insert(newUsers, 'users');
  }
};
