'use strict';
const Q = require('q');
const mySqlService = require('./../dao/mysqlService');

module.exports = {
  listUsers: function (username, role, offSet, limit) {
    let defer = Q.defer();
    let condition = {};
    if (role && role !== "")
      condition = {"role": role};
    if (username && username !== "")
      condition['user_name'] = username;
    return mySqlService.find(condition, offSet, limit, 'users')
      .then((users)=> {
        try {
          users.forEach((user)=> {
             user.password =undefined;
          });
          defer.resolve(users);
        } catch (err) {
          defer.reject(err)
        }
        return defer.promise;
      });
  },
  addUser: function (user) {
    let newUsers = [];
    newUsers.push(user);
    return mySqlService.insert(newUsers, 'users');
  }
};
