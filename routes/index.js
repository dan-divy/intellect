/** Express HTTP Router **/
var express = require('express');
var router = express.Router();
/** Some useful dependencies **/
var ta = require('time-ago');
var array_tools = require("array-tools");
/** Other important utilities **/
var user = require('../utils/handlers/user');
/** NewsAPI for real-time news feeds **/
const Question = require('../utils/models/question');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('a4c4e845fea64f9e9c72541aa354a29e').v2;

/** Home page. **/
router.get('/',function(req, res, next) {
  // Once user has logged in, show the home page.
  Question
    .find({})
    .exec(async (err, obj) => {
        await obj.forEach(q => {
            q.timeago = ta.ago(q.date);
        })
      res.render('index',{
        questions:obj,
        user:{name:req.session.user}
      });
});
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

// Expose the Express HTTP `index` router to main app.
module.exports = router;
