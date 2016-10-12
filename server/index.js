'use strict';
const express=require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const routes = require('./routes/');
const cfgManager= require('./utils/configManager');
const appConfig=cfgManager.getConfig('app');

let app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Expose-Headers","accesToken");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,accesToken");
  next();
});
app.use(cookieParser());
let server = app.listen(appConfig.port, function () {
  let host = server.address().address;
  let port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
routes(app);