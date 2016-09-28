'use strict';
const User = require('./../models/user'),
  userService = require('./../service/userService'),
  tokenHelper = require('./../helpers/tokenHelper'),
  passWordHelper = require('./../helpers/passwordHelper');

module.exports = {
  addUser: (req, res)=> {
    if (!req.body || !req.body.user) {
      res.status(400).send({success: false, message: "User must be in request body"});
    } else {
      try {
        let newUser = new User(req.body.user);
        newUser.validate();
        newUser.hashPassword();
        userService.addUser(newUser)
          .then((resp)=> {
            res.status(200).send({success: true, message: "User added successfully"});
          }).catch((err) => {
            res.status(err.status || 500).send({success: false, message: err.message || err});
          });
      } catch (err) {
        res.status(500).send({success: false, message: err.message || err});
      }
    }
  },

  validateUser: (req, res)=> {
    if (!req.body || !req.body.userName || !req.body.password) {
      res.status(400).send({success: false, message: 'userName & password must be in request'});
    } else {
      let userName = req.body.userName;
      let password = req.body.password;
      userService.listUsers(userName)
        .then((user)=> {
          if (user.length === 1 && passWordHelper.verifyHashed(password, user[0]['password'])) {
            let tokenForUSer = tokenHelper.generateToken();
            tokenHelper.addToCache(user[0].user_name, tokenForUSer);
            res.setHeader('accessToken', tokenForUSer);
            res.status(200).send({success: true, message: 'login successful'});
          } else {
            res.status(403).send({success: false, message: 'authentication failed'});
          }
        }).catch((err)=> {
          res.status(err.status || 500).send({success: false, message: 'login failed'});
        })
    }
  },

  listUsers: (req, res)=> {
    userService.listUsers("", "", req.params.offset, req.params.limit)
      .then((users)=> {
        res.status(200).send({success: true, data: users});
      }).catch((error)=> {
        res.status(error.status || 500).send({success: false, message: error.message || error});
      });
  }
};
