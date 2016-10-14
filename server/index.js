'use strict';
const express=require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const routes = require('./routes/');
const cfgManager= require('./utils/configManager');
const appConfig=cfgManager.getConfig('app');
var cors = require('cors');
let app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(cors());
let server = app.listen(appConfig.port, function () {
  let host = server.address().address;
  let port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
routes(app);