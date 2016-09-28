'use strict';
const passwordHelper =require('./../helpers/passwordHelper');
let user = function (user) {
  let newUser = this;
  try {
    let properties = Object.keys(user);
    properties.forEach(function (property) {
      newUser[property] = user[property];
    });
  } catch (error) {
    console.log(error);
    console.log(error.stack);
    throw error;
  }
};
user.prototype.validate = function () {
  let requiredProperties = ["user_name", "password", "first_name", "second_name", "role", "image_path"];
  let currentProperties = Object.keys(this);
  if (currentProperties.length !== requiredProperties.length)
    throw new Error('Invalid User');
  currentProperties.forEach(function (ppty) {
    if (requiredProperties.indexOf(ppty) < 0) {
      throw new Error('Invalid User');
    }
  });
  requiredProperties.forEach(function (ppty) {
    if (currentProperties.indexOf(ppty) < 0) {
      throw new Error('Invalid User');
    }
  })
};
user.prototype.hashPassword=function(){
  this['password']=passwordHelper.hashPassword(this['password']);
};

module.exports = user;