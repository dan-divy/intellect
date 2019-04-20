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
router.get('/',isAuth, function(req, res, next) {
  // Once user has logged in, show the home page.
    res.render('index', {user:{name:req.session.user,id:req.session._id}})
});

/**
 * An express middleware to check if `user` has authenticated.
 *
 * @param {Object|Array} req
 * @param {Object|Array} res
 * @param {Function} next
 * @api private
 */

function isAuth(req, res, next) {
  // If Request.Session has the details of user, proceed.
//if(req.session._id && req.session.user) {
    next() // Continue with the user.
  //}
  // Else redirect the user back to the login page for authentication.
  //else {
    //res.render('auth/login',{
    //  error:false // No error to be shown.
    //})
  //}
}

// Expose the Express HTTP `index` router to main app.
module.exports = router;
