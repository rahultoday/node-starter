'use strict';
const Q = require('q');
const cfgManager = require('./../utils/configManager');
const dbConnection = cfgManager.getConfig('db');
const database = require('./../dao/tables');
let connection;
database.connect(dbConnection.host, dbConnection.database,
  dbConnection.user, dbConnection.password, dbConnection.protocol, dbConnection.port, (err, conn)=> {
    if (err) {
      throw err;
    } else {
      connection = conn;
    }
  });

module.exports = {
  find: function (condition, offset, limit, table) {
    let defer = Q.defer();
    connection.models[table].find(condition, {offset: offset}, limit, function (error, response) {
      if (error) {
        defer.reject(error);
      } else {
        defer.resolve(response);
      }
    });
    return defer.promise;
  },
  insert: function (items, table) {
    var defer = Q.defer();
    connection.models[table].create(items, function (err, response) {
      if (err) {
        defer.reject(err);
      } else {
        defer.resolve(response);
      }
    });
    return defer.promise;
  },
  removeById: function (id, table) {
    var defer = Q.defer();
    connection.models[table].get(id, function (err, item) {
      if (err)
        defer.reject(err);
      else {
        item.remove(function (err) { // callback optional
          if (err)
            defer.reject(err);
          else
            defer.resolve("item removed");
        });
      }

    });
    return defer.promise;
  },
  getById: function (id, table) {
    var defer = Q.defer();
    connection.models[table].get(id, function (err, item) {
      if (err)
        defer.reject(err);
      else {
        defer.resolve(item);
      }
    });
    return defer.promise;
  }
};