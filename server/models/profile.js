/**
 * Created by vineeth on 14/10/16.
 */

'use strict';
const requiredProfileProperties = ["user_name", "first_name", 'second_name', 'addr_line1', 'addr_line2', 'city'
  , 'state', 'pin', 'image_path', 'pan_number', 'mobile_number', 'voters_id', 'sponsers_name', 'sponser_number', 'verified'];

let profile = (givenProfile)=> {
  let newProfile = this;
  Object.keys(givenProfile).forEach((property)=> {
    if (requiredProfileProperties.indexOf(property) < 0)
      throw new Error("Invalid profile");
  });
  requiredProfileProperties.forEach((ppty)=> {
    if (Object.keys(givenProfile).indexOf(ppty) < 0)
      throw new Error('Invalid User');
    newProfile[ppty] = givenProfile[ppty];
  });
};





module.exports = profile;