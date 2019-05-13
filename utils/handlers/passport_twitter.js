// config/passport.js

// load all the things we need
//var LocalStrategy    = require('passport-local').Strategy;
//var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy  = require('passport-twitter').Strategy;

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
    passport.use(new TwitterStrategy({

        consumerKey     : configAuth.twitter.client_id,
        consumerSecret  : configAuth.twitter.client_secret,
        callbackURL     : configAuth.twitter.redirect_url

    },
    function(token, tokenSecret, profile, done) {

        // make the code asynchronous
    // User.findOne won't fire until we have all our data back from Twitter
        process.nextTick(function() {

            User.findOne({ 'profile.id' : profile.id, 'profile.service': 'twitter' }, function(err, user) {

                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err)
                    return done(err);

                // if the user is found then log them in
                if (user) {
                    return done(null, user); // user found, return that user
                } else {
                    // if there is no user, create them
                    var newUser = new User();
                    newUser.profile = {id:profile.id,token,username:profile.username,displayName:profile.displayName, service: 'twitter'};
                    //newUser = {id:profile.id,token,username:profile.username,displayName:profile.displayName, service: 'twitter'}
                    // save our user into the database
                    newUser.save(function(err, result) {
                        if (err)
                            throw err;
                        return done(null, result.profile);
                    });
                }
            });

    });

    }));

};
