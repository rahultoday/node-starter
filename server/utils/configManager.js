'use strict';
const configManager = require('node-config-manager');
const options = {
  configDir: './config',
  env: process.env.NODE_ENV === undefined ? "default" : process.env.NODE_ENV,
  camelCase: true
};
configManager.init(options);
configManager.addConfig('app')
  .addConfig('logger')
  .addConfig('db');

module.exports = configManager;