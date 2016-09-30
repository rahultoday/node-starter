'use strict';
const Q = require('q');
const mySqlService = require('./../dao/mysqlService');

module.exports = {

  addUser: (user) => {
    let newUsers = [];
    newUsers.push(user);
    return mySqlService.insert(newUsers, 'users');
  },

  listUsers: (username, role, offSet, limit)=> {
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
            user.password = undefined;
          });
          defer.resolve(users);
        } catch (err) {
          defer.reject(err)
        }
        return defer.promise;
      });
  },

  updateUser: (user, username)=> {
    let defer = Q.defer();
    let condition = {user_name: username};
    mySqlService.find(condition, "", "", 'users')
      .then((dbUser)=> {
        if (dbUser.length > 0) {
          Object.keys(user).forEach((property)=> {
            if (dbUser[property] !== user[property]) {
              dbUser[property] = user[property];
            }
          });
          dbUser.save((err)=> {
            if (err)defer.reject(err);
            else defer.resolve()
          });
        } else {
          defer.reject({status: 400, message: 'User not exists'});
        }
      }).catch((err)=> {
        defer.reject(err);
      });
    return defer.promise;
  }
};
