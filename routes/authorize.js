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
/** login page. **/
router.get('/login', function(req, res, next) {
  // Render the login page.
    res.render('auth/login', {error:false});
});
/** signup page. **/
router.get('/:oauth_service', function(req, res, next) {
  // Redirect to the OAuth service page.
  switch (req.params.oauth_service) {
    case "google":
      passport.authenticate('google', { scope : ['profile', 'email']})
      break;
    case "facebook":
      res.redirect(authConf.facebook.redirect_url);
      break;
   }
});

router.get('/auth/google/callback',
            passport.authenticate('google', {
                    successRedirect : '/',
                    failureRedirect : '/err'
            }));

/** logout. **/
router.get('/logout', function(req, res, next) {
  // Destroy the session and redirect back to home.
    res.session.destroy(() => {
      res.redirect('/');
    });
});

// Expose the Express HTTP `index` router to main app.
module.exports = router;
