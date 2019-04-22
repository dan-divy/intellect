/** Express HTTP Router **/
var express = require('express');
var router = express.Router();
/** Some useful dependencies **/
var passport = require("passport");
var ta = require('time-ago');
var array_tools = require("array-tools");
/** Other important utilities **/
var user = require('../utils/handlers/user');
const authConf = require('../config/oauth.js');


router.get('/', (req, res) => {
  res.render('auth/login', {error:false});
})

router.get('/:oauth_service', function(req, res, next) {
  // Redirect to the OAuth service page.
  switch (req.params.oauth_service) {
    case "google":
      res.redirect(authConf.google.auth_url)
      break;
    case "facebook":
      res.redirect(authConf.facebook.auth_url);
      break;
    default: 
      res.render('auth/login')
   }
});


router.get("/auth/google/callback", passport.authenticate("google"), (req, res) => {
  req.session.user = req.session.passport.user._json; 
  res.redirect("/");
});

/** logout. **/
router.get('/logout', function(req, res, next) {
  // Destroy the session and redirect back to home.
    res.session.destroy(() => {
      res.redirect('/');
    });
});

// Expose the Express HTTP `index` router to main app.
module.exports = router;
