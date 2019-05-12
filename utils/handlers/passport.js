// config/passport.js

// load all the things we need
/** var LocalStrategy    = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy  = require('passport-twitter').Strategy; **/
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// load up the user model
var User  = require('../models/user');

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
    // code for twitter (use('twitter', new TwitterStrategy))

    // =========================================================================
    // GOOGLE ==================================================================
    // =========================================================================
    passport.use(new GoogleStrategy({

        clientID        : configAuth.google.client_id,
        clientSecret    : configAuth.google.client_secret,
        callbackURL     : configAuth.google.redirect_url,

    },
    function(token, refreshToken, profile, done) {

        // make the code asynchronous
        // User.findOne won't fire until we have all our data back from Google
        process.nextTick(function() {

            // try to find the user based on their google id
            User.findOne({ id : profile.id, service: 'google'}, function(err, user) {
                if (err)
                    return done(err);

                if (user) {

                    // if a user is found, log them in
                    return done(null, user);
                } else {
                    // if the user isnt in our database, create a new user
                    var newUser = new User();
                    var goo = {id: profile.id, token, name:profile.displayName, email:profile.emails[0].value, service: 'google'}
                    // set all of the relevant information
                    newUser = goo;

                    // save the user
                    newUser.save(function(err,result) {
                        if (err)
                            throw err;
                        return done(null, result);
                    });
                }
            });
        });

    }));

};
