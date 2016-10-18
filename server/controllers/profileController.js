/**
 * Created by vineeth on 14/10/16.
 */
'use strict';
const Profile = require('./../models/profile');
const profileService = require('./../service/profileService');
module.exports = {
  addProfile: (req, res)=> {
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

  deleteProfile: (req, res, next)=> {
    let id = req.query.id;
    if (!id)
      res.status(400).send({success: false, status: 400, message: "id must be in query"});
    else
      profileService.deleteProfile(id)
        .then((resp)=> {
          res.status(200).send({success: true, status: 200, message: "profile updated successfully"});
        }).catch((err)=> {
          res.status(err.status || 500).send({success: false, status: err.status || 500, message: err.message || err});
        })
  },
  listProfiles: (req, res, next)=> {
    let profileName = req.query.profileName ? req.query.profileName : "";
    profileService.listProfiles(profileName, req.params.offset, req.params.limit)
      .then((users)=> {
        res.status(200).send({success: true, status: 200, data: users});
      }).catch((error)=> {
        res.status(error.status || 500).send({
          success: false,
          status: error.status || 500,
          message: error.message || error
        });
      });
  },
  approveProfile: (req, res)=> {
    let id = req.query.id;
    if (!id)
      res.status(400).send({success: false, status: 400, message: "id must be in query"});
    else
      profileService.approveProfile(id)
        .then((resp)=> {
          res.status(200).send({success: true, status: 200, message: "profile updated successfully"});
        }).catch((err)=> {
          res.status(err.status || 500).send({success: false, status: err.status || 500, message: err.message || err});
        })
  }
};