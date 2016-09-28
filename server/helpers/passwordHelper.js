'use strict';
const passwordHash = require('password-hash');

module.exports = {
  hashPassword: function (password) {
    return passwordHash.generate(password);
  },
  verifyHashed: function (password, hashedPassword) {
    return passwordHash.verify(password, hashedPassword)
  }
};