'use strict';
const orm = require('orm'),
  cfgManager = require('./../utils/configManager'),
  dbConfig = cfgManager.getConfig('db');

let connections = {};
function setup(db) {
  db.define('users', {
    user_name: String,
    password: String,
    id: {
      type: 'serial',
      key: true,
      autoIncrement: true
    },
    first_name: String,
    second_name: String,
    role: String,
    image_path: String
  }, {
    validations: {
      user_name:orm.enforce.unique(),
      first_name: orm.enforce.required()
    }
  });
  db.define('profiles', {
    user_name: String,
    digest: String,
    id: {
      type: 'serial',
      key: true,
      autoIncrement: true
    },
    first_name: String,
    second_name: String,
    addr_line1: String,
    addr_line2: String,
    city: String,
    state: String,
    pin: String,
    image_path: String,
    pan_number: String,
    mobile_number: String,
    voters_id: String,
    sponsers_name: String,
    sponser_number: String,
    verified: String
  }, {
    validations: {
      user_name:orm.enforce.unique(),
      first_name: orm.enforce.required()
    }
  });
  db.sync(function (err, data) {
    if (err) {
      console.log(err);
    }
  });
}
module.exports.connect = function (host, database, user, pswd, protocol, port, cb) {
  if (connections[host] && connections[host][database]) {
    cb(null, connections[host][database]);
  }
  var opts = {
    host: host,
    database: database,
    user: user,
    password: pswd,
    protocol: protocol,
    port: port,
    query: {pool: true}
  };
  orm.connect(opts, function (err, db) {
    if (err) {
      console.log(err.stack);
      return cb(err);
    } else {
      connections[host] = connections[host] || {};
      connections[host][database] = db;
      setup(db);
      cb(null, db);
    }
  });
};
