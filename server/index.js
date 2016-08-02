var app = require('./app');
var model = require('./models');
var user  = new model.user();
user.set('digest', 'dkfnsdkk');
user.set('user_name', 'joe@example.com');
user.save().then(function(u) {
    console.log('User saved:', u.get('user_name'));
});
module.exports = app;
