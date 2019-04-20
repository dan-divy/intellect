/** Express HTTP Router **/
var express = require('express');
var router = express.Router();
/** Some useful dependencies **/
var ta = require('time-ago');
var array_tools = require("array-tools");
/** Other important utilities **/
var user = require('../utils/handlers/user');

/** login page. **/
router.get('/login', function(req, res, next) {
  // Render the login page.
    res.render('auth/login', {error:false});
});

/** signup page. **/
router.get('/:service', function(req, res, next) {
  // Redirect to the Google login.
  res.redirect("/")

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
