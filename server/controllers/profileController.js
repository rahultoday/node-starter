/**
 * Created by vineeth on 14/10/16.
 */
'use strict';
const Profile = require('./../models/profile');
const profileService = require('./../service/profileService');
module.exports = {
  addProfile: (req, res, next)=> {
    if (!req.body || !req.body.profile) {
      res.status(400, {success: false, status: 400, message: "profile must be in request body"});
    } else {
      try {
        let profile = new Profile(req.body.profile);
        profileService.addProfile(profile)
          .then((resp)=> {
            res.status(200).send({success: true, status: 200, message: "Profile added successfully"});
          }).catch((err)=> {
            res.status(err.status || 500).send({
              success: false,
              status: err.status || 500,
              message: err.message || err
            });
          });
      } catch (err) {
        res.status(err.status || 500).send({success: false, status: err.status || 500, message: err.message || err});
      }

    }
  },
  editProfile: (req, res, next)=> {

  },

  deleteProfile: (req, res, next)=> {

  },
  listProfiles: (req, res, next)=> {
    profileService.listProfiles("", req.params.offset, req.params.limit)
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
};