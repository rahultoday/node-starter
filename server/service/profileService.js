'use strict';
const mySqlService = require('./../dao/mysqlService');
const Q = require('q');

module.exports = {
  addProfile: (profile) => {
    let newProfiles = [];
    newProfiles.push(profile);
    return mySqlService.insert(newProfiles, 'profiles');
  },

  listProfiles: (username, offSet, limit)=> {
    let defer = Q.defer();
    let condition = {};
    if (username && username !== "")
      condition['user_name'] = username;
    return mySqlService.find(condition, offSet, limit, 'profiles')
      .then((users)=> {
        try {
          users.forEach((user)=> {
            user.password = undefined;
          });
          defer.resolve(users);
        } catch (err) {
          defer.reject(err)
        }
        return defer.promise;
      });
  },

  getProfile: (username, role, offSet, limit)=> {
    let condition = {};
    if (role && role !== "")
      condition = {"role": role};
    if (username && username !== "")
      condition['user_name'] = username;
    return mySqlService.find(condition, offSet, limit, 'profiles')
  },

  approveProfile: (id)=> {
    return mySqlService.getById(id, "profiles")
      .then((profile)=> {
        let defer = Q.defer();
        profile['verified'] = true;
        profile.save((err)=> {
          if (err) defer.reject(err);
          else defer.resolve("profile updated successfully");
        });
        return defer.promise;
      });
  },
  deleteProfile:(id)=>{
    return mySqlService.removeById(id,'profiles');
  }
};