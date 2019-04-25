// config/passport.js

// load all the things we need
var LocalStrategy    = require('passport-local').Strategy;
//var FacebookStrategy = require('passport-facebook').Strategy;
//var TwitterStrategy  = require('passport-twitter').Strategy;

// load up the user model
var User = require('../models/user');

// load the auth variables
var configAuth = require('../../config/oauth');

module.exports = function(passport) {

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // code for login (use('local-login', new LocalStategy))
    // code for signup (use('local-signup', new LocalStategy))
    // code for facebook (use('facebook', new FacebookStrategy))

    // =========================================================================
    // TWITTER =================================================================
    // =========================================================================
    passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));
}
