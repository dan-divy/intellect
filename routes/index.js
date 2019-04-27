/** Express HTTP Router **/
var express = require('express');
var router = express.Router();
/** Some useful dependencies **/
var ta = require('time-ago');
var array_tools = require("array-tools");
/** Other important utilities **/
var user = require('../utils/handlers/user');
/** NewsAPI for real-time news feeds **/
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('a4c4e845fea64f9e9c72541aa354a29e').v2;

/** Home page. **/
router.get('/',isLoggedIn, function(req, res, next) {
  // Once user has logged in, show the home page.
    res.render('index', {user:{name:req.session.user}})
});

/**
 * An express middleware to check if `user` has authenticated.
 *
 * @param {Object|Array} req
 * @param {Object|Array} res
 * @param {Function} next
 * @api private
 */

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.session.user)
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/authorize');
}

// Expose the Express HTTP `index` router to main app.
module.exports = router;
