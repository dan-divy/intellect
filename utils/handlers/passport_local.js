// config/passport.js

// load all the things we need
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');
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
    // LOCAl =================================================================
    // =========================================================================
    passport.use(new LocalStrategy({
      passReqToCallback:true
    },
  function(req, username, password, done) {

    User.findOne({ 'local.username': username }, function (err, user) {
      if (err) { return done(err); }
      if(!req.body.firstname || !req.body.lastname) {
        if(user) {
        bcrypt.compare(password,user.local.password, (error ,matches)=> {
          if(matches) {
            return done(null, user);
          }
          else {
            return done(null, false);
          }
        })
      }
      else {
        done(null,false)
      }
      }
      if (!user) {
       var newUser = new User();
        newUser.local = {
          username:username,
          password:newUser.generateHash(password),
          firstname:req.body.firstname,
          lastname:req.body.lastname
        }
        newUser.save((err, res) => {
              return done(null, res);
        })

       }

    });
  }
));
}
