'use strict';
const User = require('./../models/user'),
  userService = require('./../service/userService'),
  tokenHelper = require('./../helpers/tokenHelper'),
  passWordHelper = require('./../helpers/passwordHelper');

module.exports = {
  addUser: (req, res)=> {
    if (!req.body || !req.body.user) {
      res.status(400).send({success: false, status: 400, message: "user must be in request body"});
    } else if (!req.headers.token || req.headers.token === "") {
      res.status(400).send({success: false, status: 400, message: "token must be in request header"});
    } else if (!tokenHelper.validateToken(req.headers.token)) {
      res.status(403).send({success: false, status: 403, message: "invalid token"});
    } else {
      try {
        let newUser = new User(req.body.user);
        newUser.validate();
        newUser.hashPassword();
        userService.addUser(newUser)
          .then((resp)=> {
            res.status(200).send({success: true, status: 200, message: "User added successfully"});
          }).catch((err) => {
            if (err.message === 'not-unique')
              res.status(409).send({success: false, status: 409, message: "User already exists"});
            res.status(err.status || 500).send({
              success: false,
              status: err.status || 500,
              message: err.message || err
            });
          });
      } catch (err) {
        res.status(500).send({success: false, status: 500, message: err.message || err});
      }
    }
  },

  validateUser: (req, res)=> {
    if (!req.body || !req.body.userName || !req.body.password) {
      res.status(400).send({success: false, status: 400, message: 'userName & password must be in request'});
    } else {
      let userName = req.body.userName;
      let password = req.body.password;
      userService.listUsers(userName)
        .then((user)=> {
          if (user.length === 1 && passWordHelper.verifyHashed(password, user[0]['password'])) {
            let tokenForUSer = tokenHelper.generateToken();
            tokenHelper.addToCache(user[0].user_name, tokenForUSer);
            res.setHeader('accessToken', tokenForUSer);
            res.status(200).send({success: true, status: 200, message: 'login successful'});
          } else {
            res.status(403).send({success: false, status: 403, message: 'authentication failed'});
          }
        }).catch((err)=> {
          res.status(err.status || 500).send({success: false, status: err.status || 500, message: 'login failed'});
        })
    }
  },

  listUsers: (req, res)=> {
    if (!req.headers.token || req.headers.token === "") {
      res.status(400).send({success: false, status: 400, message: "token must be in request header"});
    } else if (!tokenHelper.validateToken(req.headers.token)) {
      res.status(403).send({success: false, status: 403, message: "invalid token"});
    } else {
      userService.listUsers("", "", req.params.offset, req.params.limit)
        .then((users)=> {
          res.status(200).send({success: true, status: 200, data: users});
        }).catch((error)=> {
          res.status(error.status || 500).send({
            success: false,
            status: error.status || 500,
            message: error.message || error
          });
        });
    }
  },
  updateUer: (req, res)=> {
    if (!req.body.user || !req.params.username) {
      res.status(400).send({success: false, status: 400, message: "user must be in body & username must be in query"});
    }
    else {
      try {
        let newUser = new User(req.body.user);
        newUser.validate();
        newUser.hashPassword();
        userService.updateUser(newUser, req.params.username)
          .then((resp)=> {
            res.status(200).send({success: true, status: 200, message: "User details updated successfully"});
          }).catch((err)=> {
            res.status(err.status || 500).send({success: false, status: err.status || 500, message: err.message || err})
          });
      } catch (err) {
        res.status(500).send({success: false, status: 500, message: err.message || err});
      }
    }
  }
};
