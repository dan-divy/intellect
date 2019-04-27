/** Express HTTP Router **/
var express = require('express');
var router = express.Router();
/** Some useful dependencies **/
var passport = require("passport");
//require("../utils/handlers/passport_facebook")(passport)
var ta = require('time-ago');
var array_tools = require("array-tools");
/** Other important utilities **/
var user = require('../utils/handlers/user');
const authConf = require('../config/oauth.js');


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
      next();
   }
});

router.get('/twitter', passport.authenticate('twitter'));
router.post('/spruce',(req, res) => {
   passport.authenticate('local',(error, user) => {
     req.session.user = user;
     res.end('<script>window.location.href="/";</script>')
   })(req,res)
});

router.get('/', (req, res) => {
  res.render('auth/login', {error:false});
});

router.get('/login', (req, res) => {
  res.render('auth/local', {error:false});
});

router.get('/new', (req, res) => {
  res.render('auth/signup', {error:false});
})

router.get("/auth/google/callback", passport.authenticate("google"), (req, res) => {
  req.session.user = req.session.passport.user._json;
  res.redirect("/");
});

router.get("/auth/facebook/callback", passport.authenticate("facebook"), (req, res) => {
  req.session.user = req.session.passport.user._json;
  res.redirect("/");
});


router.get("/auth/twitter/callback", passport.authenticate("twitter"), (req, res) => {
  req.session.user = req.session.passport.user._json;
  res.redirect("/");
});

/** logout. **/
router.get('/logout', function(req, res, next) {
    req.session.destroy(() => {
      res.redirect('/');
    });
});

// Expose the Express HTTP `index` router to main app.
module.exports = router;
