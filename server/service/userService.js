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

  getUser: (username, role, offSet, limit)=> {
    let condition = {};
    if (role && role !== "")
      condition = {"role": role};
    if (username && username !== "")
      condition['user_name'] = username;
    return mySqlService.find(condition, offSet, limit, 'users')
  },
  updateUser: (user, username)=> {
    let defer = Q.defer();
    let condition = {user_name: username};
    let offset = undefined, limit = undefined;
    mySqlService.find(condition, offset, limit, 'users')
      .then((dbUser)=> {
        if (dbUser.length === 1) {
          Object.keys(user).forEach((property)=> {
            if (dbUser[0][property] !== user[property]) {
              dbUser[0][property] = user[property];
            }
          });
          dbUser[0].save((err)=> {
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
  },
  deleteUser: (id)=> {
    return mySqlService.removeById(id, 'users');
  }
};
